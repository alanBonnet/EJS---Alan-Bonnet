const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
    {
        id:{
            type:Number,
            required:true,
            unique:true
        },
        nombre:{
            type:String,
            required:true
        },
        motivo:{
            type:String,
            max:300
        },
        fecha:{
            type:Date,
            default:new Date()
        },
        estado:{
            type:Number,
            min:0,
            max:4,
            default:1
        },
        isActive:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);

module.exports = model("task",TaskSchema);

