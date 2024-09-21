import { MotionValue, motion } from "framer-motion";

export default function SectionSpacer({
  backgroundGradient

}: {
  backgroundGradient: MotionValue<string>;
}) {
  return (
    <motion.div
      style={{ background: backgroundGradient }}
      className="w-screen border-none outline-none"
    ></motion.div>
  );
}
