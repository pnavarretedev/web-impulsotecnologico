import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un correo electrónico válido';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'El mensaje es obligatorio';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setFieldErrors({});

    // Validación del frontend
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('idle');
      return;
    }

    try {
      const response = await fetch('https://form.impulsotecnologico.cl/api/contact-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Manejar errores de validación del backend
        if (data.errors && Array.isArray(data.errors)) {
          const backendErrors = {};
          data.errors.forEach(error => {
            backendErrors[error.field] = error.message;
          });
          setFieldErrors(backendErrors);
          setStatus('idle');
        } else {
          throw new Error(data.message || 'Error al enviar el mensaje. Por favor, intenta nuevamente.');
        }
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);

    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div className="group">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nombre completo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`block w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none hover:border-cyan-300 ${
                fieldErrors.name ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
              placeholder="Tu nombre"
              disabled={status === 'loading'}
            />
          </div>
          {fieldErrors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div className="group">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Correo electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`block w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none hover:border-cyan-300 ${
                fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
              placeholder="tu@email.com"
              disabled={status === 'loading'}
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="group">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Mensaje
          </label>
          <div className="relative">
            <div className="absolute top-3 left-0 pl-4 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className={`block w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none hover:border-cyan-300 resize-none ${
                fieldErrors.message ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
              placeholder="Cuéntanos sobre tu proyecto o consulta..."
              disabled={status === 'loading'}
            />
          </div>
          {fieldErrors.message && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {fieldErrors.message}
            </p>
          )}
        </div>

        {status === 'success' && (
          <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-green-800 font-medium">
              ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 font-medium">
              {errorMessage}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={status === 'loading' || !formData.name || !formData.email || !formData.message}
          className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {status === 'loading' ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <span>Enviar mensaje</span>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-600 text-center">
          Al enviar este formulario, aceptas que nos pongamos en contacto contigo para responder tu consulta.
        </p>
      </div>
    </div>
  );
}