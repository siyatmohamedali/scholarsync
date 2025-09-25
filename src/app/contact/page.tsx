
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Contact Us</h1>
        <p className="mx-auto mt-2 max-w-2xl text-lg text-foreground/80">
          We'd love to hear from you. Whether you have a question, feedback, or a partnership inquiry, please don't hesitate to reach out.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Send Us a Message</CardTitle>
          <CardDescription>
            Please fill out the form below and we will get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is your message about?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Write your message here..." rows={6} />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
