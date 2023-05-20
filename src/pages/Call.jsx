import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

export default function Call(){
    return(
        <motion.div 
            initial={{x:-500}}
            animate={{x:0}}
            transition={{duration: 1.5, ease:"easeInOut"}}
            exit={{x:500}}
            className="layout_2">
            <h2>Home</h2>
        </motion.div>
    )
}