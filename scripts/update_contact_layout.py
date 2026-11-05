file_path = r"d:\precision-build-website\src\components\site\Contact.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# Replace the JSX return block
old_return_start = '  return (\n    <section className={`bg-white pb-24 md:pb-32 ${isHeroSection ? "pt-32 md:pt-40" : "pt-24 md:pt-32"}`}>\n      <div className="container">\n        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">'

if old_return_start not in code:
    # try CRLF
    old_return_start = '  return (\r\n    <section className={`bg-white pb-24 md:pb-32 ${isHeroSection ? "pt-32 md:pt-40" : "pt-24 md:pt-32"}`}>\r\n      <div className="container">\r\n        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">'

print("Found return start:", old_return_start in code)

# Let's write the clean compact responsive replacement
new_contact_jsx = """  return (
    <section className={`bg-white pb-20 md:pb-28 ${isHeroSection ? "pt-28 md:pt-36" : "pt-20 md:pt-28"}`}>
      <div className="container max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="industrial-badge mb-6">Contact With Us</div>
            {isHeroSection ? (
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[1.1] mb-6 text-balance text-stone-950 font-black">
                Contact With Us
              </h1>
            ) : (
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight leading-[1.1] mb-6 text-balance text-stone-950">
                Professional support for your <span className="text-primary">machine requirements</span>
              </h2>
            )}
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg text-sm sm:text-base">
              Share your polishing, buffing or special-purpose machine requirement and our team will guide you toward the right solution.
            </p>

            <div className="space-y-5 mb-8">
              <a href="tel:+919175282992" className="flex items-center gap-4 group">
                <div className="shrink-0 size-11 rounded-full border-2 border-primary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="size-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] font-body font-bold uppercase tracking-widest text-muted-foreground">
                    Phone
                  </div>
                  <div className="font-body text-sm sm:text-base font-semibold group-hover:text-primary transition-colors text-stone-950">
                    +91-9175282992
                  </div>
                </div>
              </a>

              <a href="tel:+918956648126" className="flex items-center gap-4 group">
                <div className="shrink-0 size-11 rounded-full border-2 border-primary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone className="size-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] font-body font-bold uppercase tracking-widest text-muted-foreground">
                    Alternate Phone
                  </div>
                  <div className="font-body text-sm sm:text-base font-semibold group-hover:text-primary transition-colors text-stone-950">
                    +91-8956648126
                  </div>
                </div>
              </a>

              <a href="mailto:sale@mbtools.in" className="flex items-center gap-4 group">
                <div className="shrink-0 size-11 rounded-full border-2 border-primary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail className="size-4 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <div className="text-[10px] font-body font-bold uppercase tracking-widest text-muted-foreground">
                    Email
                  </div>
                  <div className="font-body text-sm sm:text-base font-semibold group-hover:text-primary transition-colors text-stone-950 flex flex-col">
                    <span>sale@mbtools.in</span>
                    <span className="text-xs text-stone-500 font-medium">sales.mbtools@gmail.com</span>
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="shrink-0 size-11 rounded-full border-2 border-primary flex items-center justify-center mt-1">
                  <MapPin className="size-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-body font-bold uppercase tracking-widest text-muted-foreground">
                    M.B. Finishing Technologies
                  </div>
                  <div className="font-body text-sm sm:text-base font-semibold leading-relaxed text-stone-950">
                    Gat No 669 & 670, Balghare Vasti, Chikhali, Pune - 411062.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 size-11 rounded-full border-2 border-primary flex items-center justify-center mt-1">
                  <MapPin className="size-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-body font-bold uppercase tracking-widest text-muted-foreground">
                    M.B. Finishing Pvt. Ltd.
                  </div>
                  <div className="font-body text-sm sm:text-base font-semibold leading-relaxed text-stone-950">
                    Plot No. T-165/15, next to Trishul Service Station, T Block, MIDC, Bhosari, Pimpri-Chinchwad, Maharashtra 411026
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-[16/9] rounded-2xl border border-primary/10 overflow-hidden shadow-sm">
              <iframe
                title="M.B. Finishing Technologies location"
                src="https://www.google.com/maps?q=Bhosari%20MIDC%20Pune&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-5 h-fit lg:sticky lg:top-28">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl p-6 sm:p-7 md:p-8 bg-[#fbf7ef] border border-primary/10 shadow-[0_12px_45px_-25px_rgba(20,20,20,0.2)]"
            >
              <h3 className="font-heading text-xl sm:text-2xl uppercase mb-5 text-stone-950 font-bold tracking-tight">
                Product Inquiry
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-1.5 font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    maxLength={100}
                    className="w-full rounded-xl px-3.5 py-2.5 bg-white border border-primary/20 focus:border-primary focus:outline-none transition-colors text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-1.5 font-semibold">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => setForm({ ...form, phone: event.target.value })}
                      maxLength={30}
                      className="w-full rounded-xl px-3.5 py-2.5 bg-white border border-primary/20 focus:border-primary focus:outline-none transition-colors text-sm"
                      placeholder="+91 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-1.5 font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      maxLength={255}
                      className="w-full rounded-xl px-3.5 py-2.5 bg-white border border-primary/20 focus:border-primary focus:outline-none transition-colors text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-heading uppercase tracking-widest text-muted-foreground mb-1.5 font-semibold">
                    Machine requirement
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    maxLength={1000}
                    className="w-full rounded-xl px-3.5 py-2.5 bg-white border border-primary/20 focus:border-primary focus:outline-none transition-colors resize-none text-sm"
                    placeholder="Tell us which product or application you need..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-2 group flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 bg-primary text-primary-foreground font-heading text-xs sm:text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors disabled:opacity-60 shadow-md font-bold"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <Send className="size-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
"""

target_marker = "  return ("
idx = code.find(target_marker)
if idx != -1:
    updated_code = code[:idx] + new_contact_jsx
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_code)
    print("Contact.tsx successfully updated!")
else:
    print("Could not find target marker")

