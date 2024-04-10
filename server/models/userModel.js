const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const passwordValidator = require('password-validator');


const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
}, { timestamps: true })

const passwordSchema = new passwordValidator()
.is().min(8, 'The password should have a minimum length of 8 characters')                                   
.is().max(100, 'The password length should be under 100 characters')                                 
.has().uppercase(1, 'The password should include an uppercase letter')                              
.has().lowercase(1, 'The password should include a lowercase letter')                             
.has().digits(2, 'The password should have a minimum of 2 digits')
.has().symbols(1, 'The password should have a symbol')                           
.has().not().spaces()                          

//static signup method
userSchema.statics.signup = async function(email, password) {
    //validation
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use')
    }

    const passwordValidationErrors= passwordSchema.validate(password, {details:true});
    if (passwordValidationErrors.length>0){
        firstValError=passwordValidationErrors[0]['message']
        if(passwordValidationErrors[0]['validation']=='spaces'){
            firstValError=firstValError.replace('string', 'password')
        }
        throw Error(firstValError)
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)
