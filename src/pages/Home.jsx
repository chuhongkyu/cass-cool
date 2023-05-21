import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function Home(){
    return(
        <motion.div 
            initial={{x: "100%"}}
            animate={{x:0}}
            transition={{duration: 1.5, ease:"easeInOut"}}
            exit={{x:"-100%"}}
            className="layout_1">
                <h2>Home</h2>
        </motion.div>
    )
}