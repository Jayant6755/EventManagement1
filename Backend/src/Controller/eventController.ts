import express from 'express';
import  Event  from '../Model/model';

const router = express.Router();


// Get all events
router.get("/", async (req, res) => {
    
    try {
        
        const events = await Event.find();    
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Create a new event
router.post("/", async (req, res) => {
    try {
        const { title, description, venue, date, time } = req.body;
        if(!title || !description || !venue || !date || !time){
            return res.status(400).json({ message: 'All fields are required' });
        }
        const exists = await Event.findOne({title});
        if(exists){
            return res.status(409).json({
                message: "Event Already Exists"
            })
        }
        const newEvent = new Event({
            title,
            description,
            venue,
            date,
            time
        });
        

        const saveEvent = await newEvent.save();
        console.log("Event created:");
        res.status(201).json(saveEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
//delete event
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const deleteEvent = await Event.findByIdAndDelete(id);
        if(!deleteEvent){
            console.log("Event not found for deletion", id);
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({message: "Teacher Deleted Successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
// Update Event
router.put("/update/:id", async (req, res)=>{
    
    
    try {
        const {title, description, venue, date, time} = req.body;

        const update = await Event.findByIdAndUpdate(
            req.params.id , 
            {title, description, venue, date, time },
            {new: true , runValidators: true} 
        );

        if(!update){
           return res.json({message: "Update Failed"});
        }
        res.status(200).json(update);
    } catch (error) {
        console.error("Error",error );
        res.status(500).json({message: "Server Error"})
    }
});

//get single event by id

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
      
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



export default router;