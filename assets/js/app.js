const quizData = [
    {
        subject: "Mathematics",
        questions: [
            {
                question: "What is the result of 5 + 3?",
                options: [7, 8, 9, 10],
                correctOption: 8,
                id: 1,
            },
            {
                question: "Solve: 12 ÷ 4",
                options: [2, 3, 4, 5],
                correctOption: 3, 
                id: 2,
            },
            {
                question: "Which of the following is equal to 3/5?",
                options: [0.6, 0.3, 1.2, 2.1],
                correctOption: 0.6, 
                id: 3,
            },
            {
                question: "What is the product of 6 and 7?",
                options: [12, 35, 42, 49],
                correctOption: 42,
                id: 4
            },
            {
                question: "What is the sum of 6 and 7?",
                options: [13, 35, 42, 49],
                correctOption: 13,
                id: 5,
            },
        ]
    },
    {
        subject: "English",
        questions: [
            {
                question: "What is the opposite of “hot”?",
                options: ["cold", "warm", "spicy", "boiling"],
                correctOption: "cold",
                id: 1,
            },
            {
                question: " Which word means the same as “happy”?",
                options: ["sad", "angry", "joyful", "tired"],
                correctOption: "joyful",
                id: 2,
            },
            {
                question: "Choose the correct spelling:",
                options: ["Accommodate", "Accommodate", "Accommodate", "Accommodate"],
                correctOption: "Accommodate", 
                id: 3,
            },
            {
                question: "What is the plural of “child”?",
                options: ["child", "childes", "children", "childie"],
                correctOption: "children", 
                id: 4,
                
            },
            {
                question: "What is the plural of boy?",
                options: ["boy", "boys", "boyed", "boies"],
                correctOption: "boys", 
                id: 5,
                
            },
        ]
    },
    {
        subject: "coding",
        questions: [
            {
                question: "Which CSS property is used to change the font size?",
                options: ["font-size", "font-color", "font-weight", "font-family"],
                correctOption: "font-size",
                id: 1,
            },
            {
                question: " How can you set the background color of an element in CSS?",
                options: ["bg-color", "background-color", "background-image", "color"],
                correctOption: "background-color",
                 id: 2,
            },
            {
                question: "What is the correct HTML tag for inserting a line break?",
                options: ["<br>", "<li>", "<break>", "<link>"],
                correctOption: "<br>", 
                id: 3,
            },
            {
                question: "Which keyword is used to declare a variable in JavaScript?",
                options: ["var", "let", "const", "all of the above"],
                correctOption: "all of the above", 
                id: 4,
            },
            {
                question: "Which keyword is used to declare a variable in JavaScript?",
                options: ["var", "let", "const", "all of the above"],
                correctOption: "all of the above",
                id: 5,
            },
        ]
    },
];


const subject_container = document.querySelector(".language_container");
const quiz_container = document.querySelector(".quiz_container");
const questions_container = document.querySelector(".question_container");
const quest_page = document.querySelector(".question")
const answer_container = document.querySelector(".answer_container");
const nextBtn = document.querySelector(".next_btn");
const number = document.querySelector(".number");
const result_container = document.querySelector(".result_container");
const score_container = document.querySelector(".score");
const yes_btn = document.querySelector(".yes");
const no_btn = document.querySelector(".no");
const win_text = document.querySelector(".congrat_text");
const img_container = document.querySelector(".img");

const img = document.createElement("img");
img.src = "";

let subject = "";
let index = 0;
let correctAnswer = true;
let score = 0;



// getting the subject dinamically
const getSubject = ()=>{
    const subjects = quizData.map((data) =>{
        const {subject} = data;
        return `
        <li class="subject" id="${subject.toLowerCase()}">${subject}</li>
        `;
    }).join("");
    subject_container.innerHTML = subjects;

    const subjectEach = document.querySelectorAll(".subject");
    // looping through the subject
    subjectEach.forEach((quest)=>{
        // onclick of each subject add the show clsss to the question container
        quest.addEventListener("click", (e)=>{
            subject = e.currentTarget.id;
            questions_container.classList.add("show");
            quiz_container.classList.remove("show");

            getQuestions();
        });
    });
};

// getting the question and pass it to the DOM
const getQuestions = ()=>{
    const questions_Data = quizData.find((data)=>{
       if(data.subject.toLowerCase() === subject){
        return data;
       }
       return;
    });
    const { questions } = questions_Data;
    const {question, options, correctOption, id} = questions[index];
    quest_page.innerHTML = `<strong>${question}</strong>`;

    // passing the options into the DOM
    const option_list = options.map((option)=>{
        return `<li class="answer">${option}</li>`;
    }).join("")
    answer_container.innerHTML = option_list;

    // getting the questions number
    let num = `Question ${id} of 5`;
    number.innerHTML = num;

    // getting the correct answer
    const correct_answer = document.querySelectorAll(".answer");
    correct_answer.forEach((answer)=>{
        answer.addEventListener("click", (e)=>{
            getCorrectAnswer(e, correctOption);
        });
    });
};

const getCorrectAnswer = (e, correctOption)=>{
    const info_container = e.currentTarget;
    
    //once the user click on any answer the user can't change it
    if(!correctAnswer) {
        return;
    }

    correctAnswer = false;
    if(index === 4){
        nextBtn.textContent = "submit";
    }
    if(info_container.textContent === correctOption.toString()) {
        score++
        info_container.classList.add("win");
    }else {
        info_container.classList.add("loose");
    }
    
    
};

nextBtn.addEventListener("click", ()=>{
    index++;
    correctAnswer = true;
    // when the index is greater than 4 return the index and show the result container
    if(index > 4){
        index = 4;
        result_container.classList.add("show");
        score_container.textContent = score.toString();
        questions_container.classList.remove("show");
    }

    if(score > 3){
        win_text.textContent = "you win";
        img.src = "assets/img/win.png";
        img_container.appendChild(img);
    }else {
       win_text.textContent = "you loose";
       img.src = "assets/img/fail.png";
       img_container.appendChild(img);
    }
    getQuestions();

});



yes_btn.addEventListener("click", ()=>{
    result_container.classList.remove("show");
    questions_container.classList.add("show");
    score = 0;
    correctAnswer = true;
    index = 0;
    getQuestions();
});

no_btn.addEventListener("click", ()=>{
    result_container.classList.remove("show");
    subject_container.classList.add("open");
});

getSubject();
