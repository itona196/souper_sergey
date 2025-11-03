import { NextResponse } from "next/server";
import { Resend } from "resend";
import { nextThursday, setHours, setMinutes, isBefore } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

function inscriptionsOuvertes() {
  const now = new Date();
  const jeudi = nextThursday(now);
  const jeudiMinuit = setMinutes(setHours(jeudi, 0), 0); 
  return isBefore(now, jeudiMinuit);
}

export async function POST(request: Request) {
  const { prenom } = await request.json();

  if (!prenom) {
    return NextResponse.json({ error: "Prénom requis" }, { status: 400 });
  }

  if (!inscriptionsOuvertes()) {
    return NextResponse.json(
      { error: "Les inscriptions sont fermées pour cette semaine." },
      { status: 403 }
    );
  }

try {
  const to = process.env.MAIL_DESTINATION;
  if (!to) {
    throw new Error("MAIL_DESTINATION non défini dans .env.local");
  }

  await resend.emails.send({
    from: "Souper du Jeudi <onboarding@resend.dev>",
    to, 
    subject: `Nouvelle inscription au souper du jeudi`,
    text: `Nouvelle inscription : ${prenom}`,
  });

  return NextResponse.json({ success: true });
} catch (err) {
  return NextResponse.json(
    { error: "Erreur lors de l’envoi du mail." },
    { status: 500 }
  );
}}
