let mongoose = require('mongoose');
let {isEmail} = require('validator');
let bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        minlength:5,
        maxlength: 25,
        lowercase: true,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 8
    },
    email: {
        type: String,
        required:true,
        validate: [isEmail],
        trim: true,
        unique: true,
        lowercase: true
    },
    displayName: {
        type: String,
        minlength: 5,
        maxlength: 24
    },
    certified: {
        type: Boolean,
        default: false
    },
    userPic : {
            imageUrl: {
                type: String,
                default: './cdn/content/default-user-pics.png'
            },
            x: {
                type: Number,
                default: 0
            },
            y: {
                type: Number,
                default: 0
            },
            cX: {
                type: Number,
                default: 0
            },
            cY: {
                type: Number,
                default: 0
            },
            scale: {
                type: Number,
                default: 1
            }
    },
    userSettings: {
        type: {
            lang: String,
            home_view: String
        }
    },
    logs: {
        type: [{ 
            date: String,
        }]
    }
}, {
    timestamps: true
});


userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(username, password) {

    const user = await this.findOne({username});
    if (user) {
        if(user.ban.isBan) {
            throw Error('banned user')
        } else {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            } else {
                throw Error('incorrect password')
            }
        }
        
    } else {
        throw Error('incorrect username');
    }

}

const userModel = mongoose.model("user",userSchema);
module.exports = userModel;