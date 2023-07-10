
// Apps Functions 
import InterviewQuestionsGenerator from "./interview_questions_generator";
import SeoProductDescriptionGenerator from "./seo_product_description_generator";


const Apps = [
    {
        appId: "interview_questions_generator",
        execute: InterviewQuestionsGenerator
    },
    {
        appId: "seo_product_description_generator",
        execute: SeoProductDescriptionGenerator
    }
]

export default Apps;