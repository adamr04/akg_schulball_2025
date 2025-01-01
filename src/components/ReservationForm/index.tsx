import React, { Component, useState } from "react";
import { useForm } from "@formspree/react";
import { Link } from "gatsby";
import { Container, Button, HeaderSection } from "@/components";
import { XIcon, PlusIcon, CheckIcon } from "@heroicons/react/outline";
import "./Form.styles.css";

export const ReservationForm = () => {
  const [state, handleSubmit] = useForm("xbjwdddo");

  const [guestList, setGuestList] = useState([
    { guestName: "", student: false, table: false },
  ]);

  const [classText, setClassText] = useState<string>('');


  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...guestList];
    list[index][name] = value;
    setGuestList(list);
  };
  const handleCheckboxChange = (e, index) => {
    const { name } = e.target;
    const list = [...guestList];
    list[index][name] = !list[index][name];
    setGuestList(list);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...guestList];
    list.splice(index, 1);
    setGuestList(list);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    setGuestList([
      ...guestList,
      { guestName: "", student: false, table: false },
    ]);
  };

  const handleClassTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassText(event.target.value);
};

  

  const renderSelectedGuests = () => {
    let str = "";
    guestList.forEach((guest) => {
      const studentStr = guest.student ? ", Schüler" : "";
      const tableStr = guest.table ? " + Tischplatz" : "";
      str = `${str}${guest.guestName}${studentStr}${tableStr}\n `;
    });
    return str;
  };


  const countStudent = guestList.filter(
    (guest) => guest.student === true
  ).length;
  const countRegular = guestList.filter(
    (guest) => guest.student === false
  ).length;
  const countTable = guestList.filter((guest) => guest.table === true).length;
  const totalVVK = countStudent * 40 + countRegular * 50 + countTable * 15;
  const totalAK = countStudent * 45 + countRegular * 55 + countTable * 15;
  const diff = totalAK - totalVVK;

  const handleScroll = (event) => {
    event.preventDefault();
    window[`scrollTo`]({ top: 460, behavior: `smooth` });
  };

  if (state.succeeded) {
    return (
      <Container>
        <HeaderSection
          title="Danke für Ihre Bestellung!"
          copy="Bitte überweisen Sie innerhalb der nächsten sieben Werktage das Geld für Ihre Kartenbestellung."
        />
        <h2>Bezahlung</h2>
        <dl className="-mx-8 -mt-8 flex flex-wrap items-end divide-x">
          <div className="flex flex-col px-8 pt-8">
            <dd className="order-1 text-4xl font-extrabold sm:text-5xl">
              <span className="text-3xl">€</span> {totalVVK}
            </dd>
          </div>
        </dl>
        <p className="text-center font-semibold">
          Verein Schulball AkG
          <br />
          IBAN: AT102011184050260200
        </p>
        <p className="text-center">
          <Button as="link" to="/">
            Zurück zu Home
          </Button>
        </p>
      </Container>
    );
  }
  return (
    <React.Fragment>
      <HeaderSection
        title="Karten bestellen"
        copy=""
      />
      <div className="form">
        
        <h2>Der Online Kartenvorverkauf beginnt am 17. Oktober 2024.</h2>
        
        <h2>Kartenverkauf und -abholung</h2>
        <p>Alle ONLINE gekauften Karten können an den Vorverkaufstagen in der Schule abgeholt werden, 
           bzw. direkt an der Abendkasse am 17. Mai 2025 entgegengenommen werden.<br></br>
          <br></br>
          <b>Der Online Kartenvorverkauf endet am 11. Mai 2025 um 23:59!</b> <br></br>
          <br></br>
          Der letzte Live-Kartenvorverkaufstag im AkG findet am Dienstag den 14. Mai 2025 in der Zeit von 09:45 bis 11:05 Uhr statt.
 
        </p>
        <h3>Karten Vorkauf und Abholung bezahlter Ballkarten in der Schule</h3>
        <b><u>WANN?</u></b>
        <p>
        Mittwoch, 2. April 2025 - 09:45 bis 11:05<br></br>
        Mittwoch, 9. April 2025 - 09:45 bis 11:05<br></br>
        Mittwoch, 23. April 2025 - 09:45 bis 11:05<br></br>
        Mittwoch, 30. April 2025 - 09:45 bis 11:05<br></br>
        Mittwoch, 7. Mai 2025 - 09:45 bis 11:05<br></br>
        letzter Verkaufstag in der Schule: Mittwoch, 14. Mai 2025 - 09:45 bis 11:05

        </p>
  
        <b><u>WO?</u></b>
        <p>
          2. Stock im AkG, vor dem Lehrer*innenzimmer
        </p>
        <section>
          <h2 className="font-sans">Preise</h2>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt>
                <div className="text-lg font-semibold">Ermäßigte Karten</div>
              </dt>
              <dd className="mt-1 text-lg">
                <div>
                  € 35,– (Supervorverkaufsbonus vom 17. Okt bis 31. Dez 2024)
                  <br />€ 40,– (Vorverkauf. 1. Jan bis 14. Mai 2025)
                  <br />€ 45,– (Abendkassa)
                </div>
                <div className="text-sm mt-2">
                  Schüler*innen, Student*innen, Lehrlinge, Zivildiener, Lehrer*innen
                </div>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt>
                <div className="text-lg font-semibold">Regulärer KArtenpreis</div>
              </dt>
              <dd className="mt-1 text-lg">
                <div>
                  € 45,– (Supervorverkaufsbonus 1. Okt bis 31. Dez 2024)
                  <br />€ 50,– (Vorverkauf 1. Jan bis 14. Mai 2025)
                  <br />€ 55,– (Abendkassa)
                </div>
              </dd>
            </div>
          </dl>
        </section>
        <h2>Tischplatzkarten</h2>
        <p>
          <b>€ 15,– (Vorverkauf 17. Okt 2024 bis 14. Mai 2025)
            <br/ >€ 25,– (Abendkasse, je nach Verfügbarkeit)</b> <br />
          Sie wollen mehrere Tischplatzkarten gleichzeitig erwerben und wollen zusammensitzen?
          Dann schreiben Sie uns bitte eine Email mit ihrem Namen und Telefonnummer und der Anzahl der Plätze an secretgarden2025@schulball-akg.at <br />
          Wir werden Ihre Bestellung umgehend bearbeiten. < br />
          Vielen Dank!!
        </p>
        <b>WICHTIG! 
          BEREITS BEZAHLTE BZW. ABGEHOLTE KARTEN KÖNNEN NICHT MEHR STORNIERT ODER RÜCKERSTATTET WERDEN !</b>
        <hr className="mt-4 border-t-2 border-skin-fg" />
        <section id="order">
          <div>
            <h2 className="font-sans">Meine Bestellung</h2>
          </div>
          {guestList.map((x, i) => {
            return (
              <React.Fragment key={i}>
                <section className="item">
                  <label>
                    <span>Karte für</span>
                    <input
                      name="guestName"
                      placeholder="Vorname Nachname"
                      value={x.guestName}
                      type="text"
                      required
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </label>
                  {guestList.length !== 1 && (
                    <button
                      className="removeItem"
                      onClick={() => handleRemoveClick(i)}
                    >
                      <span className="sr-only">Person entfernen</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  )}
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                    <label className="--inline">
                      <input
                        type="checkbox"
                        name="regular"
                        onChange={(e) => handleCheckboxChange(e, i)}
                        className="border-2 focus:border-skin-primary"
                      />
                      <span>Regulär</span>
                    </label>

                    <label className="--inline">
                      <input
                        type="checkbox"
                        name="student"
                        checked={x.student}
                        onChange={(e) => handleCheckboxChange(e, i)}
                        className="border-2 focus:border-skin-primary"
                      />
                      <span>Ermäßigt</span>
                    </label>
                    <label className="--inline">
                      <input
                        type="checkbox"
                        name="table"
                        checked={x.table}
                        onChange={(e) => handleCheckboxChange(e, i)}
                        className="border-2 focus:border-skin-primary"
                      />
                      <span>Tischplatz (15,-) (optional)</span>
                    </label>

                    <label id="inputSchulklasse">
                      <input 
                        id="inputTextSchulklasse"
                        type="text"
                        name="class"
                        className="border-2 focus:border-skin-primary"
                        required 
                        value={classText}
                        onChange={handleClassTextChange}
                      />

                      <span>Klasse (AKG Schüler)</span>
                    </label>



                  </div>
                </section>
                {guestList.length - 1 === i && (
                  <button
                    key={`add-${i}`}
                    type="button"
                    className="addItem"
                    onClick={handleAddClick}
                  >
                    
                    <PlusIcon
                      className="h-6 w-6 -mt-1 mr-3"
                      aria-hidden="true"
                    />
                    <span>Person hinzufügen</span>
                  </button>
                )}
              </React.Fragment>
            );

          })}
        </section>
        <form onSubmit={handleSubmit}>
          <input type="text" name="_gotcha" hidden />
          <section className="item">
            <h2>Kontaktperson</h2>
            <label>
              <span>Ihr Name</span>
              <input
                type="text"
                name="Kontaktperson"
                placeholder="Vorname Nachname"
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="Email"
                placeholder="james@bond.mi6"
                required
              />
            </label>
            <label>
              <span>Telefon</span>
              <input type="tel" name="Telefon" placeholder="+43 (0) 007" />
            </label>
            <textarea
              name="Guestlist"
              readOnly
              value={renderSelectedGuests()}
              className="hidden"
            />
            <input
              type="number"
              name="Abendkassa EUR"
              value={totalAK}
              readOnly
              className="hidden"
            />
            <input
              type="number"
              name="Vorverkauf EUR"
              value={totalVVK}
              readOnly
              className="hidden"
            />
            
            <input
              type="text"
              name="Schulklasse"
              value={classText}
              readOnly
              className="hidden"
            />
          </section>
          {guestList[0].guestName && (
            <section className="item --muted">
              <h3>Zusammenfassung der Bestellung</h3>
              <ol className="list-decimal text-xl font-medium ml-4">
                {guestList.map((guest, index) => (
                  <li key={index}>
                    {guest.guestName}
                    {guest.student ? " (Schüler) " : ""}
                    {guest.table ? " + Tischplatz" : ""}
                  </li>
                ))}
              </ol>
              <a
                href="#order"
                onClick={handleScroll}
                className="font-semibold inline-flex m-auto"
              >
                Ändern
              </a>
              <dl className="-mx-8 flex flex-wrap items-end divide-x border-t">
                <div className="flex flex-1 flex-col px-8 pt-8">
                  <dd className="order-1 text-4xl font-extrabold sm:text-5xl">
                    <span className="text-3xl">€</span> {totalVVK}
                  </dd>
                </div>
              </dl>
            </section>
          )}
          { 
          <button
            type="submit"
            disabled={
              ((guestList.length === 1 && guestList[0].guestName === "") ||
                state.submitting) &&
              "disabled"
            }
          >
            {state.submitting && (
              <svg
                className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            <span>
              {guestList[0].guestName && "(" + guestList.length + ")"} Karten
              bestellen
            </span>
          </button>
          }
          <h2>
            VORVERKAUF BEGINNT AM 17. OKTOBER 2024!
          </h2>
          <p>
            <strong>Bitte beachten Sie: Eine Bestellung ist verbindlich</strong>
            , d.h. Sie erklären sich bereit, im Falle einer Zuteilung von
            Tickets, diese verbindlich anzunehmen. Sie können jedoch Ihre
            Buchung vor Zuteilung der Tickets jederzeit ohne Kosten stornieren
            lassen. Schicken Sie uns dazu bitte ein E-Mail oder kontaktieren Sie
            uns telefonisch.
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};
