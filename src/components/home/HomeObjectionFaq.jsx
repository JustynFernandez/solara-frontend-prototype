import React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const FAQ_ITEMS = [
  {
    id: "faq-trust",
    question: "How do I know helpers are trustworthy?",
    answer: (
      <p>
        Start in <Link to="/connect">Connect</Link> to review verified profiles, then check our{" "}
        <Link to="/safety">safety guidance</Link> and <Link to="/community-guidelines">community guidelines</Link> before matching.
      </p>
    ),
  },
  {
    id: "faq-experience",
    question: "Do I need to know solar before asking for help?",
    answer: (
      <p>
        No. You can ask for support immediately in <Link to="/connect">Connect</Link>, or run <Link to="/solar-navigator">Solar Navigator</Link>{" "}
        first to get a clearer starting point.
      </p>
    ),
  },
  {
    id: "faq-budget",
    question: "Can I start small before committing budget?",
    answer: (
      <p>
        Yes. Begin with <Link to="/plan">Plan</Link> and <Link to="/solar-navigator">Solar Navigator</Link> for low-risk steps, then expand into{" "}
        <Link to="/services">Services</Link> when you are ready.
      </p>
    ),
  },
  {
    id: "faq-first-step",
    question: "What should I do first if I am unsure?",
    answer: (
      <p>
        If you want human guidance first, open <Link to="/connect">Connect</Link>. If you want a structured path first, start in{" "}
        <Link to="/plan">Plan</Link>.
      </p>
    ),
  },
];

const HomeObjectionFaq = () => {
  const [openItemId, setOpenItemId] = React.useState(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleItem = (itemId) => {
    setOpenItemId((prevId) => (prevId === itemId ? null : itemId));
  };

  return (
    <section className="home-redesign__faq-band">
      <ul className="home-redesign__faq-list">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openItemId === item.id;
          return (
            <li key={item.id} className="home-redesign__faq-row">
              <button
                type="button"
                className="home-redesign__faq-trigger"
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                id={`${item.id}-trigger`}
                onClick={() => toggleItem(item.id)}
              >
                <span>{item.question}</span>
                <span className={`home-redesign__faq-icon ${isOpen ? "is-open" : ""}`} aria-hidden="true">
                  {isOpen ? "-" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`${item.id}-panel`}
                    role="region"
                    aria-labelledby={`${item.id}-trigger`}
                    className="home-redesign__faq-answer-wrap is-open"
                    initial={prefersReducedMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={prefersReducedMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="home-redesign__faq-answer">{item.answer}</div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default HomeObjectionFaq;
