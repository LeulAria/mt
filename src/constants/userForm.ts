export const signUpFields = [
    {
        name: "userName",
        label: "User Name",
        variant: 'outlined',
        type: "text",
        rules: {
            required: 'this field is required',
            message: 'user name must be at least 4 characters'
        }
    },
    {
        name: "email",
        label: "Email Address",
        variant: 'outlined',
        type: "email",
        rules: {
            required: 'this field is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email address'
            },
        }
    },
    {
        name: "password",
        label: "Password",
        variant: 'outlined',
        type: "password",
        rules: {
            required: 'this field is required',
            minLength: {
                value: '6',
                message: 'password must be at least 6 characters'
            }
        }
    }
]

export const logInFields = [
    {
        name: "email",
        label: "Email Address",
        variant: 'outlined',
        type: "email",
        rules: {
            required: 'this field is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email address'
            },
        }
    },
    {
        name: "password",
        label: "Password",
        variant: 'outlined',
        type: "password",
        rules: {
            required: 'this field is required',
            minLength: {
                value: '6',
                message: 'password must be at least 6 characters'
            }
        }
    }
]


export const landingPageForm = [
    {
        name: "clientName",
        label: "Client Name",
        variant: 'standard',
        type: "text",
        rules: {
            required: 'this field is required'
        }
    },
    {
        name: "companyName",
        label: "Company Name",
        variant: 'standard',
        type: "text",
        rules: {
            required: 'this field is required'
        }
    },
    {
        name: "companyUrl",
        label: "Company Url",
        variant: 'standard',
        type: "text",
        rules: {
            required: 'this field is required'
        }
    },
    {
        name: "email",
        label: "Email Address",
        variant: 'standard',
        type: "email",
        rules: {
            required: 'this field is required',
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'invalid email address'
            },
        }
    },
    {
        name: "phoneNumber",
        label: "Tel",
        variant: 'standard',
        type: "tel",
        rules: {
            required: 'this field is required',
            pattern:{
                value: /(^(\+251)+|^0)[9][0-9]{8}\b/,
                message: 'invalid format'
            }
        }
    }
]