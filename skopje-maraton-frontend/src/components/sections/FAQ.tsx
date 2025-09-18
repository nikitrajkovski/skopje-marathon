import {Box, Typography} from "@mui/material";
import {FAQItem} from "../ui/FAQItem.tsx";

const faqs = [
  {question: "Кога ќе се оддржи маратонот во 2025", answer: "Маратонот во 2025 ќе се оддржи на 18 септември"},
  {question: "Кога ќе се започне маратонот", answer: "Маратонот ќе започне во 9 часот наутро."},
  {question: "Каде ќе започне маратонот", answer: "Маратонот ќе започне кај рекорд."},
  {
    question: "Дали може само да пешачиме доколку се пријавиме",
    answer: "Да. Дури и пешачењето ќе биде дозволено за сите посетители"
  },
  {
    question: "Дали може да волонтирам за маратонот",
    answer: "Да. Сите пријави за волонтери ќе бидат возможни на нашата електронска пошта"
  },
]

export const FAQ = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", gap: 5}}>
      <Typography variant="h2">Често поставувани прашања</Typography>
      <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", gap: 2}}>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer}/>
        ))}
      </Box>
    </Box>
  )
}