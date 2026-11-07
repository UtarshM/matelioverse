import os
import re

root_dir = os.path.abspath('.')

def check_case_sensitivity():
    mismatches = []
    checked_count = 0
    
    for dirpath, dirs, files in os.walk(root_dir):
        if any(ignored in dirpath for ignored in ['.next', 'node_modules', '.git', '.gemini']):
            continue
        for file in files:
            if not file.endswith(('.ts', '.tsx', '.js', '.jsx', '.css')):
                continue
            filepath = os.path.join(dirpath, file)
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # find imports: import ... from '...'; or require('...')
            import_matches = re.findall(r'(?:import|from|require)\s*\(?[\'"]([^\'"]+)[\'"]\)?', content)
            for imp in import_matches:
                if imp.startswith('.'):
                    checked_count += 1
                    target_rel = os.path.normpath(os.path.join(dirpath, imp))
                    # check if exact casing matches disk
                    parts = target_rel.replace(root_dir, '').strip(os.sep).split(os.sep)
                    curr = root_dir
                    for part in parts:
                        # might have extension or not
                        try:
                            actual_entries = os.listdir(curr)
                        except:
                            break
                        # check if exact match exists
                        exact = [e for e in actual_entries if e == part]
                        ci = [e for e in actual_entries if e.lower() == part.lower()]
                        
                        # handle extensionless import
                        if not exact:
                            ext_exact = [e for e in actual_entries if os.path.splitext(e)[0] == part and os.path.splitext(e)[1] in ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts', '.css']]
                            ext_ci = [e for e in actual_entries if os.path.splitext(e)[0].lower() == part.lower() and os.path.splitext(e)[1] in ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts', '.css']]
                            if ext_exact:
                                exact = ext_exact
                            if ext_ci:
                                ci = ext_ci
                        
                        if ci and not exact:
                            mismatches.append({
                                'file': os.path.relpath(filepath, root_dir),
                                'import': imp,
                                'part_in_import': part,
                                'part_on_disk': ci[0]
                            })
                            break
                        if exact:
                            curr = os.path.join(curr, exact[0])
                        elif ci:
                            curr = os.path.join(curr, ci[0])
                        else:
                            break
                elif imp.startswith('@/'):
                    checked_count += 1
                    # alias '@/...' -> './...'
                    rel_alias = imp[2:]
                    target_rel = os.path.normpath(os.path.join(root_dir, rel_alias))
                    parts = rel_alias.split('/')
                    curr = root_dir
                    for part in parts:
                        try:
                            actual_entries = os.listdir(curr)
                        except:
                            break
                        exact = [e for e in actual_entries if e == part]
                        ci = [e for e in actual_entries if e.lower() == part.lower()]
                        if not exact:
                            ext_exact = [e for e in actual_entries if os.path.splitext(e)[0] == part and os.path.splitext(e)[1] in ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts', '.css']]
                            ext_ci = [e for e in actual_entries if os.path.splitext(e)[0].lower() == part.lower() and os.path.splitext(e)[1] in ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts', '.css']]
                            if ext_exact:
                                exact = ext_exact
                            if ext_ci:
                                ci = ext_ci
                        if ci and not exact:
                            mismatches.append({
                                'file': os.path.relpath(filepath, root_dir),
                                'import': imp,
                                'part_in_import': part,
                                'part_on_disk': ci[0]
                            })
                            break
                        if exact:
                            curr = os.path.join(curr, exact[0])
                        elif ci:
                            curr = os.path.join(curr, ci[0])
                        else:
                            break

    print(f"Checked {checked_count} imports across repository.")
    if mismatches:
        print(f"Found {len(mismatches)} case-sensitivity mismatches:")
        for m in mismatches:
            print(f"  In {m['file']}: import '{m['import']}' has '{m['part_in_import']}', disk has '{m['part_on_disk']}'")
    else:
        print("ALL imports have EXACT case matching with disk. Zero case-sensitivity issues.")

if __name__ == '__main__':
    check_case_sensitivity()
