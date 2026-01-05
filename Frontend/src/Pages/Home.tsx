
import {format} from "date-fns";
import Navbar from "@/Hero/Navbar";
import { Calendar, Clock, Eye, MapPin, Pen, Sparkles, Trash } from "lucide-react";
import {Link} from "react-router-dom";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
interface Event{
    _id: string,
    title: string,
    description: string,
    venue: string,
    date: string,
    time: string,
    updatedAt: string
}

const Index = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events');
        if(!res.ok){
            throw new Error('Failed to fetch events');
        }
        
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    useEffect(() => {
      fetchEvents();
    }, []);
    
    const deleteEvents = async (id: string) =>{
     
     try {
       const res = await fetch(`http://localhost:5000/api/events/${id}`,{
        method: "DELETE",
       })
       if(!res.ok){
        const text = await res.text();
        throw new Error(`Failed to delete Event: ${res.status} ${text}`)
       }
       alert("Event Deleted Successfully");
       await fetchEvents();
     } catch (error) {
      console.error("delete Event Error", error);
      alert("Failed to Delete")
     }
    };

    

    
 
  return (
    <section className="p-8 md:p-12 lg:p-16  w-full h-auto">
        <Navbar />
      <div className="space-y-8 mt-10">
        {/* Page Header */}
        <div className="animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Your Events
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage and organize all your upcoming events in one place.
          </p>
        </div>

        {/* Content */}
        <div>
            {events.length === 0 ? (
          <div className="animate-fade-in text-center mt-20">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
                No Events Created Yet
                </h2>
                <div className="hidden lg:block">
                   <Link to="/create-event" className="border-1 border-red-400 rounded-xl py-2 px-5 "> <Button className=" cursor-pointer text-xl">Create</Button></Link>
                </div>
                </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                          
                            <div key={event.title} className="border rounded-xl p-4 shadow-sm flex flex-col gap-3">
                                <h3 className="font-bold text-lg">{event.title}</h3>
                                <p className="text-gray-400">{event.description}</p>
                                <p className="text-black"><MapPin className="inline mr-2 text-red-500" />{event.venue}</p>
                                <span className="flex felx-row">
                                  {/* Formatted date and Time */}
                                    <p className="text-black"><Calendar className="inline mr-2 text-black" />{format(new Date(event.date), "MMM d, yyyy")}</p> 
                                    <p className="text-black w-1/2 flex justify-center "><Clock className="inline mr-2 text-black" />{format(new Date(`1970-01-01T${event.time}`), "hh:mm a")}</p> 
                                    
                                </span>
                                <div className="flex flex-row border-t pt-2 mt-2">
                                  <Link to={`/events/${event._id}`} className="w-1/3 text-sm md:lg:w-30 mr-4 text-lg bg-gray-100 px-5 py-2 rounded-xl cursor-pointer" ><button className=""><Eye className="inline mr-4 "/>View</button></Link>
                                   <Link to={`/events/update/${event._id}`} className="w-1/3 text-sm md:lg:w-30 mr-4 text-lg bg-gray-100 px-5 py-2 rounded-xl cursor-pointer"> <button className=""> <Pen className="inline mr-2" /> Edit</button></Link>
                                    <button className="text-sm w-1/3 md:lg:w-20  flex items-center justify-center text-lg bg-gray-100 px-5 py-2 rounded-xl cursor-pointer" onClick={()=> deleteEvents(event._id)}> <Trash className="text-red-500"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="lg:hidden md:hidden flex items-center justify-center mt-10">
                   <Link to="/create-event"><Button className="rounded-xl py-2 px-7 border-1 border-blue-300">Create</Button></Link> 
                </div>
        </div>
      </div>
    </section>
    
  );
};

export default Index;
