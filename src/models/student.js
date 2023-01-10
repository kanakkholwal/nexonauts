import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const studentSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    RollNo: {
        type: String,
        required: true,
        unique: true
    },
    Batch: {
        type: Number,
        required: true
    },
    Branch: {
        type: String,
        required: true
    },
    semesters: {
        type: Array,
        required: true,
        "default": [
            {
                sgpi: {
                    type: String,
                    required: true,
                },
                cgpi: {
                    type: String,
                    required: true,
                },
                subjects: {
                    type: Array,
                    required: true,
                    "default": [
                        {
                            name: {
                                type: String,
                                required: true,
                            },
                            code: {
                                type: String,
                                required: true,
                            },
                            cgpi: {
                                type: String,
                                required: true,
                            }
                        }]
                }
            }]
    },
}, { timestamps: false });

const Student = model('Student', studentSchema);
export default Student;