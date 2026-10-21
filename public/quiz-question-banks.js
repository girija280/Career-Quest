(function () {
  const mcq = (id, text, answers, correct, traits) => ({
    id,
    q: text,
    type: "mcq",
    opts: answers.map((answer, index) => ({
      text: answer,
      tr: index === correct ? traits : {},
      ...(index === correct ? { correct: true } : {}),
    })),
  });

  const choice = (id, text, type, options) => ({
    id,
    q: text,
    type,
    opts: options.map(([answer, traits]) => ({ text: answer, tr: traits })),
  });

  window.CQ_QUESTION_BANKS = {
    "12th Pass": {
      iq: [
        mcq("12-iq1", "What comes next: 4, 9, 16, 25, ?", ["30", "32", "36", "49"], 2, { ABS: 3, MTH: 2 }),
        mcq("12-iq2", "If SOUTH is written as TPVUI by moving every letter forward once, how is NORTH written?", ["OPSUI", "OPSTI", "NPSUI", "OQTUI"], 0, { ABS: 3, SYS: 2 }),
        mcq("12-iq3", "All robots are machines. Some machines use sensors. Which statement must be true?", ["All robots use sensors", "All robots are machines", "No machine is a robot", "Every sensor is a robot"], 1, { ABS: 3, SYS: 2 }),
        mcq("12-iq4", "A student faces east, turns left, then turns right twice. Which direction are they facing?", ["North", "South", "East", "West"], 1, { ABS: 2, SYS: 3 }),
      ],
      gk: [
        mcq("12-sci1", "Which SI unit measures electric current?", ["Volt", "Ampere", "Ohm", "Watt"], 1, { HW: 2, SYS: 2 }),
        mcq("12-sci2", "A 3 kg object accelerates at 2 m/s². What is the net force?", ["1.5 N", "5 N", "6 N", "9 N"], 2, { MTH: 2, SYS: 2 }),
        mcq("12-sci3", "A solution with pH 3 is:", ["Acidic", "Neutral", "Basic", "A metal"], 0, { ABS: 2, STM: 1 }),
        mcq("12-sci4", "What is the main purpose of a compiler?", ["Store electrical charge", "Translate source code into executable instructions", "Increase internet speed", "Draw circuit diagrams"], 1, { SYS: 3, ABS: 2 }),
      ],
      math: [
        mcq("12-math1", "If x + y = 10 and x − y = 2, what is x?", ["4", "5", "6", "8"], 2, { MTH: 3, ABS: 2 }),
        mcq("12-math2", "What is the derivative of 2x² + 3?", ["2x", "4x", "4x + 3", "2x²"], 1, { MTH: 3, ABS: 2 }),
        mcq("12-math3", "What is sin 30°?", ["0", "1/2", "√3/2", "1"], 1, { MTH: 3 }),
        mcq("12-math4", "A bag contains 3 red and 2 blue balls. What is the probability of drawing a red ball?", ["2/5", "1/2", "3/5", "3/2"], 2, { MTH: 3, SYS: 1 }),
      ],
      sj: [
        choice("12-sj1", "You like two engineering branches equally. Before choosing, you:", "scenario", [["Build a small project in each branch.", { BLD: 3, AMB: 2 }], ["Choose the one your friends prefer.", { STM: 1 }], ["Compare subjects, roles, and your strengths.", { SYS: 3, ABS: 2 }], ["Pick the branch with the highest online salary claim.", { FIN: 2 }]]),
        choice("12-sj2", "Your entrance-exam mock score drops unexpectedly. You:", "scenario", [["Review errors and change the study plan.", { STM: 3, SYS: 3 }], ["Stop taking mock tests.", {}], ["Study only the easiest chapters.", { FIN: 1 }], ["Ask for feedback and retry under timed conditions.", { AMB: 2, STM: 2 }]]),
        choice("12-sj3", "A college offers a strong branch fit but is far from home. You:", "scenario", [["Reject it immediately.", { FIN: 1 }], ["Compare cost, support, placements, and independence.", { SYS: 3, FIN: 2 }], ["Choose only by distance.", { FIN: 2 }], ["Visit or speak with current students before deciding.", { AMB: 3, RSK: 2 }]]),
        choice("12-sj4", "Your team cannot agree on a science-project idea. You:", "scenario", [["Test the top two ideas with quick prototypes.", { BLD: 3, CRE: 2 }], ["Let the loudest person decide.", {}], ["Create criteria and score each idea.", { SYS: 3, ABS: 2 }], ["Work alone without telling the team.", { RSK: 2 }]]),
      ],
      pa: [
        choice("12-pa1", "A school project is most exciting when I can:", "preference", [["Understand the theory deeply.", { ABS: 3, MTH: 2 }], ["Build a working model.", { BLD: 3, HW: 2 }], ["Present a creative solution.", { CRE: 3, AMB: 2 }], ["Organize the team and deadline.", { SYS: 3, STM: 2 }]]),
        choice("12-pa2", "When learning a new topic, I prefer to:", "preference", [["Start with formulas and principles.", { MTH: 3, ABS: 2 }], ["Watch a demonstration and try it.", { BLD: 3, HW: 2 }], ["Discuss different interpretations.", { AMB: 3, CRE: 2 }], ["Follow a structured study sequence.", { STM: 3, SYS: 2 }]]),
        choice("12-pa3", "My ideal first year in college would include:", "preference", [["Challenging academic problems.", { STM: 3, MTH: 2 }], ["Clubs that build real products.", { BLD: 3, RSK: 2 }], ["Exploring several disciplines.", { AMB: 3, CRE: 2 }], ["A clear path toward internships.", { FIN: 3, SYS: 2 }]]),
        choice("12-pa4", "I feel most confident when a problem has:", "preference", [["A single logical answer.", { ABS: 3, MTH: 2 }], ["Parts I can assemble or test.", { HW: 3, BLD: 2 }], ["Room for an original approach.", { CRE: 3, RSK: 2 }], ["A clear plan and measurable steps.", { SYS: 3, STM: 2 }]]),
      ],
    },

    "Diploma Holder": {
      iq: [
        mcq("dip-iq1", "A drawing uses a 1:4 scale. A 15 mm line represents what actual length?", ["30 mm", "45 mm", "60 mm", "75 mm"], 2, { MTH: 3, HW: 2 }),
        mcq("dip-iq2", "What comes next: 5, 10, 20, 40, ?", ["45", "60", "70", "80"], 3, { ABS: 3, MTH: 2 }),
        mcq("dip-iq3", "All relays are switches. Some switches are automatic. Which statement must be true?", ["All relays are switches", "All relays are automatic", "No relay is automatic", "Every switch is a relay"], 0, { ABS: 3, SYS: 2 }),
        mcq("dip-iq4", "Machine A must run before B, and C must run after B. Which sequence is valid?", ["B, A, C", "A, C, B", "A, B, C", "C, A, B"], 2, { SYS: 3, ABS: 2 }),
      ],
      gk: [
        mcq("dip-sci1", "A 24 V circuit carries 6 A. What is its resistance?", ["2 Ω", "4 Ω", "6 Ω", "144 Ω"], 1, { HW: 3, MTH: 2 }),
        mcq("dip-sci2", "A 10 N force acts 2 m from a pivot. What torque is produced?", ["5 N·m", "12 N·m", "20 N·m", "40 N·m"], 2, { HW: 3, MTH: 2 }),
        mcq("dip-sci3", "Which instrument is best for measuring the outside diameter of a small shaft precisely?", ["Spirit level", "Micrometer", "Protractor", "Measuring tape"], 1, { HW: 3, SYS: 1 }),
        mcq("dip-sci4", "Preventive maintenance is performed mainly to:", ["Increase breakdown frequency", "Reduce unexpected failure", "Avoid recording machine data", "Replace all parts every month"], 1, { SYS: 3, FIN: 2 }),
      ],
      math: [
        mcq("dip-math1", "A machine takes 1000 W input and gives 800 W output. Its efficiency is:", ["20%", "75%", "80%", "125%"], 2, { MTH: 3, FIN: 1 }),
        mcq("dip-math2", "A rectangular plate is 12 cm by 8 cm. What is its area?", ["20 cm²", "40 cm²", "96 cm²", "192 cm²"], 2, { MTH: 3, HW: 1 }),
        mcq("dip-math3", "Two components are mixed in the ratio 2:3. If the total is 25 kg, how much is the first component?", ["5 kg", "10 kg", "15 kg", "20 kg"], 1, { MTH: 3, SYS: 1 }),
        mcq("dip-math4", "A workshop produces 180 parts in 6 hours. What is the average hourly output?", ["24", "30", "36", "60"], 1, { MTH: 3, FIN: 1 }),
      ],
      sj: [
        choice("dip-sj1", "Your lateral-entry class assumes a concept you have not studied. You:", "scenario", [["Create a bridge plan and ask for prerequisite material.", { STM: 3, SYS: 3 }], ["Ignore it until the final exam.", {}], ["Copy a classmate's notes without understanding them.", { FIN: 1 }], ["Build a small practical demo of the concept.", { BLD: 3, HW: 2 }]]),
        choice("dip-sj2", "Your prototype works, but test records are incomplete. You:", "scenario", [["Submit immediately because it works.", { RSK: 2, BLD: 1 }], ["Repeat key tests and document limitations.", { SYS: 3, STM: 3 }], ["Ask someone else to invent the missing readings.", {}], ["Record a demonstration and write a concise report.", { CRE: 2, SYS: 2 }]]),
        choice("dip-sj3", "You can stay in your diploma branch or switch during B.Tech. You:", "scenario", [["Stay only because it is familiar.", { STM: 2 }], ["Compare bridge subjects and career outcomes.", { SYS: 3, RSK: 2 }], ["Switch only because the new branch is popular.", { AMB: 1 }], ["Try a small project in the new branch first.", { BLD: 3, AMB: 2 }]]),
        choice("dip-sj4", "A workshop teammate repeatedly misses safety steps. You:", "scenario", [["Ignore it to avoid conflict.", {}], ["Stop the task and review the correct procedure.", { SYS: 3, HW: 2 }], ["Report them without speaking to them.", { RSK: 2 }], ["Create a simple shared safety checklist.", { CRE: 2, STM: 3 }]]),
      ],
      pa: [
        choice("dip-pa1", "I learn engineering concepts best by:", "preference", [["Taking equipment apart and rebuilding it.", { HW: 3, BLD: 3 }], ["Studying the equations behind the system.", { MTH: 3, ABS: 2 }], ["Following a detailed procedure.", { SYS: 3, STM: 2 }], ["Trying several unconventional fixes.", { CRE: 3, RSK: 2 }]]),
        choice("dip-pa2", "In a technical team, I naturally become the person who:", "preference", [["Handles tools and assembly.", { HW: 3, BLD: 2 }], ["Checks calculations and specifications.", { MTH: 3, SYS: 2 }], ["Tracks tasks and documentation.", { STM: 3, SYS: 2 }], ["Suggests alternative designs.", { CRE: 3, AMB: 2 }]]),
        choice("dip-pa3", "For my next qualification, I value:", "preference", [["Strong laboratory access.", { HW: 3, BLD: 2 }], ["Deep theoretical learning.", { ABS: 3, STM: 2 }], ["Reliable placement outcomes.", { FIN: 3, SYS: 2 }], ["Freedom to move into a new field.", { AMB: 3, RSK: 2 }]]),
        choice("dip-pa4", "When equipment fails, my first instinct is to:", "preference", [["Inspect physical connections.", { HW: 3, SYS: 2 }], ["Trace the process step by step.", { SYS: 3, ABS: 2 }], ["Try a quick replacement and test.", { BLD: 3, RSK: 2 }], ["Research a redesigned solution.", { CRE: 3, STM: 2 }]]),
      ],
    },

    "B.Tech Graduate": {
      iq: [
        mcq("bt-iq1", "Task A must finish before B, and B before C. Which order is valid?", ["B, A, C", "A, C, B", "C, B, A", "A, B, C"], 3, { SYS: 3, ABS: 2 }),
        mcq("bt-iq2", "What comes next in binary counting: 1, 10, 11, 100, ?", ["101", "110", "1000", "111"], 0, { ABS: 3, SYS: 2 }),
        mcq("bt-iq3", "All APIs are interfaces. No interface is a database. Which conclusion follows?", ["Some APIs are databases", "No API is a database", "All databases are APIs", "No API is an interface"], 1, { ABS: 3, SYS: 2 }),
        mcq("bt-iq4", "If each letter moves one place backward, how is TECH encoded?", ["SDBG", "UFDI", "SDCG", "TFCH"], 0, { ABS: 2, SYS: 3 }),
      ],
      gk: [
        mcq("bt-sci1", "Which OSI layer is primarily responsible for routing packets?", ["Physical", "Data Link", "Network", "Application"], 2, { SYS: 3, ABS: 2 }),
        mcq("bt-sci2", "Database normalization mainly helps to:", ["Increase data duplication", "Reduce redundancy and anomalies", "Remove all relationships", "Replace queries with files"], 1, { SYS: 3, ABS: 2 }),
        mcq("bt-sci3", "A closed-loop control system differs because it uses:", ["Feedback", "Only manual input", "No sensors", "Unlimited power"], 0, { SYS: 3, HW: 2 }),
        mcq("bt-sci4", "Supervised machine learning requires training data with:", ["No examples", "Only random noise", "Labels or target values", "Hardware specifications only"], 2, { ABS: 3, SYS: 2 }),
      ],
      math: [
        mcq("bt-math1", "For f(x,y)=x²+y², what is the gradient at (1,2)?", ["(1,2)", "(2,2)", "(2,4)", "(4,2)"], 2, { MTH: 3, ABS: 2 }),
        mcq("bt-math2", "What is the determinant of [[3, 1], [2, 4]]?", ["8", "10", "12", "14"], 1, { MTH: 3, SYS: 2 }),
        mcq("bt-math3", "A project has a 25% chance of an ₹8 lakh loss. What is the expected loss?", ["₹1 lakh", "₹2 lakh", "₹4 lakh", "₹6 lakh"], 1, { MTH: 3, RSK: 2 }),
        mcq("bt-math4", "Two fair coins are tossed. Probability of exactly one head is:", ["1/4", "1/3", "1/2", "3/4"], 2, { MTH: 3, ABS: 2 }),
      ],
      sj: [
        choice("bt-sj1", "You have a job offer and an M.Tech admit in your preferred field. You:", "scenario", [["Compare daily work, cost, learning, and five-year goals.", { SYS: 3, FIN: 2 }], ["Always take the higher immediate salary.", { FIN: 3 }], ["Always choose the degree.", { STM: 3 }], ["Ask whether either option can be deferred.", { AMB: 3, RSK: 2 }]]),
        choice("bt-sj2", "Your final-year project is relevant but not portfolio-ready. You:", "scenario", [["Clarify the problem, your contribution, and measured result.", { BLD: 3, SYS: 2 }], ["List only its title.", { FIN: 1 }], ["Claim the entire team project as your work.", {}], ["Remove all projects from your résumé.", { RSK: 1 }]]),
        choice("bt-sj3", "An interview reveals a major gap in your fundamentals. You:", "scenario", [["Build a focused revision plan and test it weekly.", { STM: 3, SYS: 3 }], ["Avoid technical interviews.", {}], ["Keep applying without changing preparation.", { RSK: 2 }], ["Build a small project using the weak concepts.", { BLD: 3, ABS: 2 }]]),
        choice("bt-sj4", "Your team proposes a technically impressive feature users did not request. You:", "scenario", [["Build it fully before asking anyone.", { RSK: 3, BLD: 2 }], ["Test the need with users and a small prototype.", { SYS: 3, BLD: 2 }], ["Reject every new idea.", { FIN: 2 }], ["Add it only because a competitor has it.", { AMB: 1 }]]),
      ],
      pa: [
        choice("bt-pa1", "My preferred next step would let me:", "preference", [["Deepen one technical specialization.", { ABS: 3, STM: 3 }], ["Build products used by real customers.", { BLD: 3, AMB: 2 }], ["Lead projects and business decisions.", { SYS: 3, FIN: 2 }], ["Explore research without a fixed outcome.", { CRE: 3, RSK: 2 }]]),
        choice("bt-pa2", "In engineering work, I most enjoy:", "preference", [["Designing system architecture.", { SYS: 3, ABS: 2 }], ["Implementing and shipping features.", { BLD: 3, STM: 2 }], ["Analyzing models and data.", { MTH: 3, ABS: 2 }], ["Discovering new product directions.", { CRE: 3, AMB: 2 }]]),
        choice("bt-pa3", "I choose a specialization mainly for:", "preference", [["Intellectual depth.", { ABS: 3, STM: 2 }], ["Strong market demand.", { FIN: 3, SYS: 2 }], ["Opportunities to build hardware.", { HW: 3, BLD: 2 }], ["Its potential to create something new.", { CRE: 3, RSK: 2 }]]),
        choice("bt-pa4", "When requirements are incomplete, I prefer to:", "preference", [["Create assumptions and validate them.", { AMB: 3, SYS: 2 }], ["Wait until every detail is provided.", { STM: 2 }], ["Build a quick experiment.", { BLD: 3, RSK: 2 }], ["Model several possible solutions.", { ABS: 3, CRE: 2 }]]),
      ],
    },

    "M.Tech Passed": {
      iq: [
        mcq("mt-iq1", "What comes next: 3, 6, 18, 72, ?", ["144", "216", "288", "360"], 3, { ABS: 3, MTH: 2 }),
        mcq("mt-iq2", "All validated models are reproducible. Model X is validated. What follows?", ["Model X is reproducible", "Model X is profitable", "Every reproducible model is validated", "Model X has no limitations"], 0, { ABS: 3, SYS: 2 }),
        mcq("mt-iq3", "Method A is faster than B. B is more accurate than A. If accuracy is mandatory, which choice is justified?", ["Always choose A", "Choose B unless another method meets the constraint", "Choose randomly", "Ignore accuracy"], 1, { SYS: 3, ABS: 2 }),
        mcq("mt-iq4", "A paper is cited by 2, 6, 12, and 20 later studies in successive years. If the pattern continues, the next count is:", ["24", "28", "30", "32"], 2, { MTH: 3, ABS: 2 }),
      ],
      gk: [
        mcq("mt-sci1", "A p-value below a chosen significance level generally leads a researcher to:", ["Prove the hypothesis permanently", "Reject the null hypothesis", "Ignore the sample", "Conclude the effect is practically large"], 1, { MTH: 3, ABS: 2 }),
        mcq("mt-sci2", "A model that performs well on training data but poorly on new data is:", ["Underfitting", "Overfitting", "Normalized", "Deterministic"], 1, { ABS: 3, SYS: 2 }),
        mcq("mt-sci3", "For an invention to be patentable, which quality is fundamental?", ["Novelty", "A large team", "A university logo", "A published salary estimate"], 0, { CRE: 2, FIN: 2 }),
        mcq("mt-sci4", "Technology Readiness Levels describe:", ["Employee seniority", "Technology maturity from concept to use", "Journal impact only", "Project cost only"], 1, { SYS: 3, BLD: 2 }),
      ],
      math: [
        mcq("mt-math1", "A correlation coefficient near zero indicates:", ["A strong positive linear relation", "A strong negative linear relation", "Little linear relationship", "Definite causation"], 2, { MTH: 3, ABS: 2 }),
        mcq("mt-math2", "A Pareto-optimal solution is one where:", ["Every objective is maximal", "No objective improves without worsening another", "Only cost is considered", "Constraints are removed"], 1, { SYS: 3, MTH: 2 }),
        mcq("mt-math3", "If all prediction errors are doubled, RMSE becomes:", ["Half as large", "Unchanged", "Twice as large", "Four times as large"], 2, { MTH: 3, SYS: 2 }),
        mcq("mt-math4", "For independent events A and B, P(A∩B) equals:", ["P(A)+P(B)", "P(A)−P(B)", "P(A)P(B)", "P(A)/P(B)"], 2, { MTH: 3, ABS: 2 }),
      ],
      sj: [
        choice("mt-sj1", "One thesis experiment cannot be reproduced. You:", "scenario", [["Report the limitation and rerun critical checks.", { STM: 3, SYS: 3 }], ["Remove it without mention.", {}], ["Publish before anyone notices.", { RSK: 3 }], ["Change the hypothesis after seeing the data.", { CRE: 1 }]]),
        choice("mt-sj2", "You are choosing between a PhD and an advanced industry role. You:", "scenario", [["Compare daily work, mentorship, funding, and long-term goals.", { SYS: 3, FIN: 2 }], ["Choose the more prestigious title.", { FIN: 1 }], ["Use a PhD only to delay decisions.", { STM: 1 }], ["Pilot both through a collaboration or internship.", { AMB: 3, BLD: 2 }]]),
        choice("mt-sj3", "A junior engineer challenges your design with strong evidence. You:", "scenario", [["Review the evidence and revise if needed.", { ABS: 3, AMB: 3 }], ["Reject it because you are more qualified.", {}], ["Ask for a small validating experiment.", { BLD: 3, SYS: 2 }], ["Delay the decision to avoid disagreement.", { FIN: 1 }]]),
        choice("mt-sj4", "An industry partner needs results faster than your full method allows. You:", "scenario", [["Agree on staged results with confidence limits.", { SYS: 3, AMB: 2 }], ["Promise precision without evidence.", { RSK: 2 }], ["End the collaboration immediately.", {}], ["Build a baseline while rigorous work continues.", { BLD: 3, CRE: 2 }]]),
      ],
      pa: [
        choice("mt-pa1", "My strongest motivation now is to:", "preference", [["Produce original research.", { ABS: 3, CRE: 3 }], ["Apply expertise to industry systems.", { BLD: 3, SYS: 2 }], ["Teach and mentor future engineers.", { STM: 3, AMB: 2 }], ["Commercialize a technical idea.", { RSK: 3, FIN: 2 }]]),
        choice("mt-pa2", "I prefer technical problems that:", "preference", [["Have theoretical depth.", { ABS: 3, MTH: 2 }], ["Can be validated through experiments.", { BLD: 3, SYS: 2 }], ["Connect several disciplines.", { CRE: 3, AMB: 2 }], ["Have measurable industry value.", { FIN: 3, SYS: 2 }]]),
        choice("mt-pa3", "In a senior role, I would rather:", "preference", [["Lead a specialist research group.", { STM: 3, ABS: 2 }], ["Own architecture and technical decisions.", { SYS: 3, BLD: 2 }], ["Build partnerships and new ventures.", { RSK: 3, AMB: 2 }], ["Become a trusted independent expert.", { ABS: 3, FIN: 2 }]]),
        choice("mt-pa4", "When evidence conflicts with my initial theory, I:", "preference", [["Recheck the method and update the theory.", { ABS: 3, SYS: 3 }], ["Defend the original theory first.", { STM: 1 }], ["Design a new experiment.", { BLD: 3, CRE: 2 }], ["Look for a practical decision despite uncertainty.", { AMB: 3, FIN: 2 }]]),
      ],
    },

    "Job Seeker": {
      iq: [
        mcq("job-iq1", "A hiring process has screening before interview and interview before offer. Which order is valid?", ["Interview, screening, offer", "Screening, offer, interview", "Screening, interview, offer", "Offer, screening, interview"], 2, { SYS: 3, ABS: 2 }),
        mcq("job-iq2", "What comes next: 2, 5, 11, 23, ?", ["35", "46", "47", "48"], 2, { ABS: 3, MTH: 2 }),
        mcq("job-iq3", "All data analysts interpret data. Some people who interpret data use Python. Which statement must be true?", ["All data analysts use Python", "All data analysts interpret data", "No analyst uses Python", "Everyone using Python is an analyst"], 1, { ABS: 3, SYS: 2 }),
        mcq("job-iq4", "If SKILL is coded as TLJMM by moving each letter forward once, JOB is coded as:", ["KPC", "IPC", "KOB", "JPC"], 0, { ABS: 2, SYS: 3 }),
      ],
      gk: [
        mcq("job-sci1", "An applicant tracking system is mainly used to:", ["Design products", "Organize and screen applications", "Issue degrees", "Calculate taxes only"], 1, { SYS: 3, FIN: 1 }),
        mcq("job-sci2", "Version control helps a team to:", ["Track and merge code changes", "Increase monitor brightness", "Replace all testing", "Hide project history"], 0, { SYS: 3, BLD: 2 }),
        mcq("job-sci3", "Which message is the strongest sign of phishing?", ["A scheduled team update", "An urgent request for credentials through an unknown link", "A saved calendar reminder", "A document you created"], 1, { SYS: 3, RSK: 2 }),
        mcq("job-sci4", "Cloud computing commonly provides:", ["On-demand computing resources over a network", "Only offline storage", "Mechanical power", "A replacement for every local device"], 0, { SYS: 3, ABS: 2 }),
      ],
      math: [
        mcq("job-math1", "A salary rises from ₹4 LPA to ₹5 LPA. What is the percentage increase?", ["20%", "25%", "40%", "80%"], 1, { MTH: 3, FIN: 2 }),
        mcq("job-math2", "You complete 18 of 24 planned applications. What is the completion rate?", ["60%", "70%", "75%", "80%"], 2, { MTH: 3, SYS: 1 }),
        mcq("job-math3", "Five interview scores average 72. What is their total?", ["77", "144", "360", "720"], 2, { MTH: 3 }),
        mcq("job-math4", "A task takes 6 hours manually and 2 hours after automation. How much time is saved?", ["2 hours", "3 hours", "4 hours", "8 hours"], 2, { MTH: 2, BLD: 2 }),
      ],
      sj: [
        choice("job-sj1", "You meet 70% of a job description and can perform its core work. You:", "scenario", [["Apply with evidence of relevant skills.", { RSK: 2, BLD: 3 }], ["Wait until you meet every preference.", { STM: 2 }], ["Claim skills you do not have.", {}], ["Apply without tailoring anything.", { AMB: 1 }]]),
        choice("job-sj2", "You receive no interview calls for a month. You:", "scenario", [["Track applications and test résumé and portfolio changes.", { SYS: 3, STM: 3 }], ["Send the same résumé to random roles.", { RSK: 2 }], ["Stop applying permanently.", {}], ["Ask for feedback and build one proof-of-skill project.", { BLD: 3, AMB: 2 }]]),
        choice("job-sj3", "A lower-paid role offers strong mentorship and relevant experience. You:", "scenario", [["Compare learning, finances, and salary-growth potential.", { FIN: 3, SYS: 2 }], ["Reject it only because of starting salary.", { FIN: 2 }], ["Accept without checking responsibilities.", { RSK: 2 }], ["Negotiate a review after clear milestones.", { AMB: 3, BLD: 2 }]]),
        choice("job-sj4", "You want to switch into engineering from another field. You first:", "scenario", [["Map transferable skills and test the field with a project.", { BLD: 3, SYS: 2 }], ["Enroll in the longest course immediately.", { STM: 2 }], ["Hide all previous experience.", {}], ["Choose only by salary rankings.", { FIN: 2 }]]),
      ],
      pa: [
        choice("job-pa1", "My next role should primarily offer:", "preference", [["Stable income and clear progression.", { FIN: 3, STM: 2 }], ["Rapid learning and broad responsibility.", { AMB: 3, BLD: 2 }], ["Deep technical specialization.", { ABS: 3, STM: 2 }], ["A chance to create new products.", { CRE: 3, RSK: 2 }]]),
        choice("job-pa2", "When preparing for interviews, I prefer to:", "preference", [["Follow a structured weekly plan.", { STM: 3, SYS: 2 }], ["Build projects that prove skills.", { BLD: 3, CRE: 2 }], ["Study difficult fundamentals deeply.", { ABS: 3, MTH: 2 }], ["Practice uncertain scenarios with others.", { AMB: 3, RSK: 2 }]]),
        choice("job-pa3", "At work, I am most energized by:", "preference", [["Solving technical problems.", { ABS: 3, SYS: 2 }], ["Finishing visible deliverables.", { BLD: 3, STM: 2 }], ["Coordinating people and priorities.", { AMB: 3, SYS: 2 }], ["Finding a better way to do the job.", { CRE: 3, RSK: 2 }]]),
        choice("job-pa4", "When choosing between job offers, I prioritize:", "preference", [["Compensation and stability.", { FIN: 3, STM: 2 }], ["The manager and learning environment.", { AMB: 3, SYS: 2 }], ["Technical depth of the work.", { ABS: 3, MTH: 2 }], ["Ownership and product impact.", { BLD: 3, RSK: 2 }]]),
      ],
    },
  };
})();
