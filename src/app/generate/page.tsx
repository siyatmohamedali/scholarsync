import { GenerateForm } from './generate-form';

export default function GeneratePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Scholarship Creation Tool</h1>
        <p className="mx-auto mt-2 max-w-2xl text-lg text-foreground/80">
          Leverage AI to effortlessly convert scholarship information from any website into a structured, ready-to-publish post.
        </p>
      </header>
      <GenerateForm />
    </div>
  );
}
