import { motion as Motion } from "framer-motion";

export const ScrollAnimate = ({ children }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }} // Começa invisível e 30px abaixo
      whileInView={{ opacity: 1, y: 0 }} // Quando entra na tela, aparece e sobe
      transition={{ duration: 0.8, ease: "easeOut" }} // Suavidade da animação
      viewport={{ once: true, amount: 0.2 }} // Anima só uma vez quando 20% do item aparecer
    >
      {children}
    </Motion.div>
  );
};
