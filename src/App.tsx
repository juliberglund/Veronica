import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function BookingSite() {
  const VeronicaV = "/bilder/VeronicaV.JPG";
  const Logo = "/bilder/logoo.png";

  type FormData = {
    name: string;
    email: string;
    phone: string;
    preferred: string;
    contactBy: "email" | "phone";
    message: string;
  };

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    preferred: "",
    contactBy: "email",
    message: "",
  });

  const [error, setError] = useState<string>("");
  const [openedMail, setOpenedMail] = useState<boolean>(false);

  const testimonials = [
    {
      name: "Erika Westin, Psykiatrisjuksköterska",
      text: "En givande föreläsning som fängslar och berör på djupet. Veronica framför sina upplevelser på ett intressant och personligt sätt vilket väcker många tankar och starka känslor.",
    },
    {
      name: "Staffan Sehlin, Kriminolog",
      text: "En intressant föreläsning med en engagerad föreläsare.",
    },
    {
      name: "Åhörare",
      text: "En bra och gripande föreläsning som trollband åhörarna till många reflektioner och eftertankar.",
    },
  ];

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate(): string {
    if (!form.name.trim()) return "Fyll i namn.";
    if (!form.email.trim() && form.contactBy === "email")
      return "Fyll i e-postadress.";
    if (!form.phone.trim() && form.contactBy === "phone")
      return "Fyll i telefonnummer.";
    if (!form.message.trim()) return "Skriv ett kort meddelande om bokningen.";
    return "";
  }

  function openMailClient(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const vErr = validate();
    setError(vErr);
    if (vErr) return;

    const to = "veronicavadeback@gmail.com";
    const subject = encodeURIComponent(`Bokningsförfrågan från ${form.name}`);

    let bodyLines: string[] = [];
    bodyLines.push(`Namn: ${form.name}`);
    if (form.email) bodyLines.push(`E-post: ${form.email}`);
    if (form.phone) bodyLines.push(`Telefon: ${form.phone}`);
    if (form.preferred)
      bodyLines.push(`Föredragen tid/datum: ${form.preferred}`);
    bodyLines.push(`Föredragen kontaktväg: ${form.contactBy}`);
    bodyLines.push("\nMeddelande:");
    bodyLines.push(form.message);

    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    window.location.href = mailto;
    setOpenedMail(true);
  }

  return (
    <div className="min-h-screen bg-purple-100 font-sans text-gray-800 flex flex-col">
      {/* Header med logga */}
      <header className="py-6 flex justify-center">
        <img src={Logo} alt="Logo" className="w-32 h-32 object-contain" />
      </header>

      {/* Huvudinnehåll med vänster/höger */}
      <main className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full gap-8 px-6 md:px-12">
        {/* Vänster kolumn: allt textinnehåll */}
        <section className="flex-1 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              Veronica Vadebäck
            </h1>
            <p className="text-lg text-gray-600 mt-2">Föreläsare</p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Min föreläsning inehåller om hur våld, övergrepp och besvikelse
            leder till självskadebeteende och psykisk ohälsa. Om hur samhället
            flyttat mig runt mellan familjehem, HVB-hem och psykiatri.
            Föreläsningen handlar också om mina tre år inlåst på SIS, varav ett
            år isolerad från övriga på ett enskilt boende och om tiden efter SIS
            och var jag är i livet nu. Idag har jag djupgående kunskap kring
            sexuella övergrepp och trauman i barndomen tillsammans med
            expertiskunskap inom området överlevare av incest.
          </p>

          <div className="flex gap-4 items-center">
            <img
              src={VeronicaV}
              alt="Profil 2"
              className="w-32 h-32 rounded-lg object-cover shadow"
            />
            <p className="text-sm text-gray-600">
              Veronica Vadebäck, föreläsare och författare.
            </p>
          </div>

          {/* Mer om mig */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Mer om mig</h2>
            <p className="text-gray-700 leading-relaxed">
              Jag heter Veronica Vadebäck och är föreläsare och författare från
              Västernorrland. Genom mina föreläsningar delar jag med mig av egna
              erfarenheter av trauman, psykisk ohälsa och vägen vidare mot ett
              nytt liv. Min ambition är att beröra, väcka tankar och skapa
              förståelse för de komplexa frågor som rör utsatthet, övergrepp och
              återhämtning.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Vid sidan av mitt författarskap, där jag gett ut böcker genom
              Bokförlaget Ekström & Garay, studerar jag till präst. Jag är också
              tvåbarnsmamma och har därför en vardag där både familj, studier
              och föreläsningar får samsas – något som jag ser som en styrka och
              en viktig del av vem jag är.
            </p>
          </div>

          {/* Recensioner */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Recensioner</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <blockquote
                  key={i}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm"
                >
                  <p className="text-gray-800">“{t.text}”</p>
                  <footer className="mt-2 text-sm text-gray-600">
                    — {t.name}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Separator-linje */}
        <div className="hidden lg:block w-px bg-gray-300"></div>

        {/* Höger kolumn: Bokningsformulär */}
        <aside className="lg:w-96 flex-shrink-0">
          <h2 className="text-2xl font-semibold mb-4">Boka mig</h2>
          <form onSubmit={openMailClient} className="flex flex-col gap-3">
            <label className="text-sm">Namn *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border"
            />
            <label className="text-sm">
              E-post {form.contactBy === "email" ? "*" : ""}
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border"
            />
            <label className="text-sm">
              Telefon {form.contactBy === "phone" ? "*" : ""}
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border"
            />
            <label className="text-sm">Välj datum</label>
            <Calendar
              onChange={(date) =>
                setForm((s) => ({
                  ...s,
                  preferred: (date as Date).toISOString().split("T")[0],
                }))
              }
              value={form.preferred ? new Date(form.preferred) : null}
            />
            {form.preferred && (
              <p className="text-sm text-gray-700 mt-2">
                Du har valt:{" "}
                {new Date(form.preferred).toLocaleDateString("sv-SE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            <label className="text-sm">Hur vill du bli kontaktad?</label>
            <select
              name="contactBy"
              value={form.contactBy}
              onChange={handleChange}
              className="px-3 py-2 rounded-md border"
            >
              <option value="email">E-post</option>
              <option value="phone">Telefon</option>
            </select>
            <label className="text-sm">Meddelande *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="px-3 py-2 rounded-md border"
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="mt-2 bg-black text-white rounded-lg px-4 py-2 hover:opacity-95"
            >
              Skicka bokningsförfrågan
            </button>
            {openedMail && (
              <div className="text-green-700 text-sm mt-2">
                Din mejlapp bör ha öppnats — kontrollera att meddelandet
                skickades.
              </div>
            )}
          </form>
        </aside>
      </main>

      {/* Footer med logga */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <img
          src={Logo}
          alt="Logo"
          className="mx-auto w-24 h-24 object-contain mb-4"
        />
        © {new Date().getFullYear()} Veronica Vadebäck
      </footer>
    </div>
  );
}
