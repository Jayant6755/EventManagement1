import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";


const CreateEvent = () => {
    const navigate = useNavigate();
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [venue, setvenue] = useState("");
    const [date, setdate] = useState("");
    const [time, settime] = useState("");

    const handleCreateEvent = async(e: React.FormEvent) => {
        e.preventDefault();
        const eventData = {
            title,
            description,
            venue,
            date,
            time
        };
        
        try {
            
            const response = await fetch("http://localhost:5000/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });
            
            

            if (!response.ok) {
                throw new Error("Failed to create event");
            }
           
            navigate("/")
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Error creating event. Please try again.");
        }

    };


  return (
    <section className="p-8 md:p-12 lg:p-16 w-full min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="animate-slide-up">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4 -ml-2 text-xl">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
          </Link>

            <div className="space-y-4" >
                <Card className="text-xl font-serif h-auto ">
  <CardHeader >
    <CardTitle>Enter Events</CardTitle>
    <CardDescription className="font-sans">Fill the details below to create an event</CardDescription>
  </CardHeader>
  <form onSubmit={handleCreateEvent}>
  <CardContent>
    <span>
        <h1>Event Title</h1>
        <Input type="text" value={title} onChange={(e) => settitle(e.target.value)} placeholder="Event Title" className="mt-2 mb-4 w-full"/>
    </span>
    <span>
        <h1>Event Description</h1>
        <Textarea value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Event Description" className="mt-2 mb-4 w-full"/>
    </span>
    <span>
        <h1>Venue</h1>
        <Input type="text" value={venue} onChange={(e) => setvenue(e.target.value)} placeholder="Event-Location" className="mt-2 mb-4 w-full"/>
    </span>
    <span className="flex w-full flex-row">
        <div className="w-1/2 pr-2">
            <h1>Start Date</h1>
            <Input type="date" value={date} onChange={(e) => setdate(e.target.value)} className="mt-2 mb-4 w-full"/>
        </div>
        <div className="w-1/2 pl-2">
            <h1>Time</h1>
            <Input type="time" value={time} onChange={(e) => settime(e.target.value)} className="mt-2 mb-4 w-full"/>
        </div>
    </span>
    <span>
       
    </span>
    <Button className="bg-red-500 text-white cursor-pointer hover:scale-103" type="submit">Create Event</Button>
  </CardContent>
    </form>
 
 
</Card>
            </div>

        </div>
        
        
        
      </div>
    </section>
  );
};

export default CreateEvent;
