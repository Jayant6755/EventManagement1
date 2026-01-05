import { MapPin, ArrowLeft } from 'lucide-react';
import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


interface Event{
  _id: string,
  title: string,
  description: string;
  venue: string;
  date: string;
  time: string;
  createdat: string;
  updatedat: string;
}

 const API_URL = "https://eventmanagement1-fgjq.onrender.com";

export const ViewEvents = () => {
        const {id} = useParams<{id: string}>();
        const [loading, setloading] = useState(true);
        const [store, setstore] = useState({
         _id:"",
        title: "",
        description: "",
        venue: "",
        date: "",
        time: "",
        });
        const navigate = useNavigate();
        //fetching the data from backend
        useEffect(()=>{
            if (!id) return;
            

             const fetchEvent = async () => {
   
    try {
      
      const res = await fetch(`${API_URL}/api/events/${id}`);
      
      if (!res.ok) throw new Error("Failed to fetch event");
      const data: Event = await res.json();
     
       setstore({
        _id: data._id,
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

//delete 
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
       navigate("/");
     } catch (error) {
      console.error("delete Event Error", error);
      alert("Failed to Delete")
     }
    };

    


if (loading) return <p>Loading...</p>;

  // Format the date 
  const formattedDate = new Date(store.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  //Format Time
  const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

  return (
     <section className="flex flex-col items-center justify-center w-full min-h-screen p-8">
        <Link to="/">
            <Button variant="ghost"  className="gap-2 mb-4 -ml-2 text-xl">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
          </Link>
      <div className="flex flex-col border p-6 rounded-xl gap-6 w-full max-w-2xl shadow-md">
        {/* Disply of the data */}
        <div className="flex justify-between border-b pb-2">
          <h1 className="text-xl font-bold">{store.title}</h1>
          <div className="flex gap-4">
           <Link to={`/events/update/${id}`}><button className="text-blue-500 border p-2 rounded-xl">Edit</button></Link> 
            <button className="text-red-500 border p-2 rounded-xl"  onClick={()=> deleteEvents(store._id)}>Delete</button>
          </div>
        </div>

        
        <div className="flex justify-start gap-10 border-b pb-2">
          <p>
            <span className="font-semibold">Date:</span> {formattedDate}
          </p>
          <p>
            <span className="font-semibold">Time:</span> {formatTime(store.time)}
          </p>
        </div>

       
        <div className="flex items-center gap-2 border-b pb-2">
          <p className='text-red-500 font-semibold'> <MapPin className="inline mr:3" /> Location: </p>
          <p>{store.venue}</p>
          
        </div>

        
        <div>
          <h2 className="font-semibold text-lg mb-2">About this Event</h2>
          <p>{store.description}</p>
        </div>
      </div>
    </section>
  )
}
