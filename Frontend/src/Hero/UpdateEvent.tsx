import { useNavigate, Link, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";



interface Event{
  _id: string,
  title: string,
  description: string;
  venue: string;
  date: string;
  time: string;
}

const UpdateEvent = () => {
  const navigate = useNavigate();
    const {id} = useParams<{id: string}>();
    const [loading, setloading] = useState(true);
    const [form, setform] = useState({
        title: "",
        description: "",
        venue: "",
        date: "",
        time: "",
    })

    

   useEffect(() => { //fetch Event data by Id
    
    if(!id) return;
    const fetchEvent = async () => {
   
    try {
      
      const res = await fetch(`http://localhost:5000/api/events/${id}`);
      
      if (!res.ok) throw new Error("Failed to fetch event");
      const data: Event = await res.json();
     
       setform({
        title: data.title,
        description: data.description,
        venue: data.venue,
        date: new Date(data.date).toISOString().split("T")[0],
        time: data.time,
      });
      setloading(false);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  fetchEvent();
}, [id]);

   const handleUpadate = async (e:any) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`http://localhost:5000/api/events/update/${id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form),
      });
      if(!res.ok) throw new Error("Update Failed")
      navigate('/');
    
    } catch (error) {
      console.error("update error", error);
    }
   };
   if(loading){
    return <p className="flex items-center justify-center text-5xl w-full h-screen">Loading...</p>
   }


  return (
    <section className="p-8 md:p-12 lg:p-16 w-full min-h-screen">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="animate-slide-up">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4 -ml-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
          </Link>

            <div className="space-y-4" >
                <Card className="text-xl font-serif h-auto ">
  <CardHeader >
    <CardTitle>Update Events</CardTitle>
    <CardDescription className="font-sans">Make the Changes Below</CardDescription>
  </CardHeader>
  <form onSubmit={handleUpadate}>
  <CardContent>
    <span>
        <h1>Event Title</h1>
        <Input type="text" value={form.title} onChange={(e)=> setform({...form, title:e.target.value})} placeholder="Event Title" className="mt-2 mb-4 w-full"/>
    </span>
    <span>
        <h1>Event Description</h1>
        <Textarea value={form.description} onChange={(e)=> setform({...form, description:e.target.value})} placeholder="Event Description" className="mt-2 mb-4 w-full"/>
    </span>
    <span>
        <h1>Venue</h1>
        <Input type="text" value={form.venue} onChange={(e)=> setform({...form, venue:e.target.value})} placeholder="Event-Location" className="mt-2 mb-4 w-full"/>
    </span>
    <span className="flex w-full flex-row">
        <div className="w-1/2 pr-2">
            <h1>Start Date</h1>
            <Input type="date" value={form.date} onChange={(e)=> setform({...form, date:e.target.value})} className="mt-2 mb-4 w-full"/>
        </div>
        <div className="w-1/2 pl-2">
            <h1>Time</h1>
            <Input type="time" value={form.time} onChange={(e)=> setform({...form, time:e.target.value})} className="mt-2 mb-4 w-full"/>
        </div>
    </span>
    <span>
       
    </span>
    <Button className="bg-red-500 text-white cursor-pointer hover:scale-103" type="submit">Save</Button>
  </CardContent>
    </form>
 
 
</Card>
            </div>

        </div>
        
        
        
      </div>
    </section>
  );
};

export default UpdateEvent;
