import { useState } from "react";

export default function RegisterPage() {
    const [formData,setFormData] = useState({ name: '', email: '', password: ''})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState ('')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})


    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const res = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type' : 'application/json'},
        })
        
        const data = await res.json()

        if (!res.ok || !data.success) {
            throw new Error(data.error || data.message || 'Registration failed')

        }
  
        // Save token for later authenticated requests 
        if (data.token) {
            localStorage.setItem('token', data.token)
        }

        setSuccess('Account created ! You can go to login or chat now.')
    } catch (err) {
        setError(err.message)

    } finally{
        setLoading(false)

    }
    
}

return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8">

            <h1 className="text-2xl font-semibold mb-6 text-center">Create account</h1>
            
            {error && (
                <p className="mb-4 text-sm text-red-600">
                    {error}
                    </p>
                )}
                {success && (
                    <p className= "mb-4 text-sm text-green-600"> {success}</p>

                )}
                <div className="mb-4">
                    <label className="block text=sm font-medium mb-1" htmlFor="name">
                        Name
                        </label>
                        <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring"
                        placeholder="Your name"
                        required
                        />
                    </div>
                     
                     <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Name 
                    </label>
                    <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearanc=none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                    placeholder="Your name"
                    required
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                    placeholder="you@example.com"
                    required
                    />
                    </div>

                    <div className="mb-6">
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                    placeholder="********"
                    minlength={6}
                    required
                    />
                    </div>

                    <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button> 

                    <p className="mt-4 text-center text-sm text-gray-600">      
                        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
                    </p>    
            
        </form>
    </main>
)
}