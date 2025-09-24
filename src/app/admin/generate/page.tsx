import { GenerateForm } from './generate-form';

export default function GeneratePage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Scholarship Creation Tool</h1>
        <p className="mt-1 text-foreground/80">
          Leverage AI to effortlessly convert scholarship information from any website into a structured, ready-to-publish post.
        </p>
      </header>
      <GenerateForm />
    </div>
  );
}
