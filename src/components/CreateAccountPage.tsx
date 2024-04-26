import { useState } from 'react';
import {
  IonPage, IonContent, IonInput, IonButton, IonIcon,
  IonLabel, IonCheckbox, IonText
} from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';


const CreateAccountPage = () => {

  const [errors, setErrors] = useState({
    username: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dobValue, setDobValue] = useState('');
  const [dobInputType, setDobInputType] = useState('text');
  const [formData, setFormData] = useState({
    username: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleDobFocus = (e: { target: { value: string; }; }) => {
    e.target.value=''
    setDobInputType('date'); // Switch to date type on focus
  };

  const handleDobBlur = (e: { target: { value: any; }; }) => {
    if (!e.target.value) {
      setDobInputType('text'); // Switch back to text type if no date is selected
    }
  };

  const validateDateOfBirth = (dateString: string) => {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    selectedDate > currentDate
    ? setErrors({ ...errors, dateOfBirth: 'Date of birth cannot be in the future.' })
    : setErrors({ ...errors, dateOfBirth: '' });
  };

  const validateField = (name: string, value: string) => {
    let fieldErrors = { ...errors };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    switch (name) {
      case 'username':
        fieldErrors.username = value.length <= 3 && value.length !== 0 ? 'Username must be greater than 3 characters.' : '';
        break;
      case 'email':
        fieldErrors.email = !emailRegex.test(value) && value.length !== 0 ? 'Email address must be a valid email.' : '';
        break;
      case 'password':
        fieldErrors.password = !passwordRegex.test(value) && value.length !== 0 ? 'Password must be at least 8 characters, include a number, an uppercase letter, and a special character.' : '';
        break;
      case 'confirmPassword':
        fieldErrors.confirmPassword = value !== formData.password && value.length !== 0 ? 'Passwords do not match.' : '';
        break;
      default:
        break;
    }
  
    setErrors(fieldErrors);
  };

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
  
    setFormData({ ...formData, [name]: value });
    name === 'dateOfBirth' ? validateDateOfBirth(value) : validateField(name, value);
  };
  

  const isFormValid = () => {
    return (
      formData.username.length > 3 &&
      new Date(formData.dateOfBirth) <= new Date() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password) &&
      formData.password === formData.confirmPassword &&
      acceptedTerms
    );
  };

  const handleSubmit = () => {
    console.log(formData);
    alert("Operation successful!");
  };

  return (
    <IonPage >
      <IonContent className="bg-white">
        <div className="max-w-md mx-auto p-4">
          <div className="text-left mt-11 mb-6">
            <IonText color="dark">
              <h1 className="text-[28px] font-semibold text-black">Let's get you started</h1>
            </IonText>
            <p className="mt-2 text-[#393D41]">
              Already have an account? <a href="/login" className="text-blue-500">Login</a>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2">Username</label>
              <input type="text" required placeholder="Enter username"
                className="w-full border border-[#C2C3C4] rounded-lg px-4 py-3 bg-white focus:border-blue-500 focus:outline-none"
                name='username'
                onChange={handleInputChange}
                value={formData.username}
              />
              {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2">Date of birth</label>
              <input
                type={dobInputType}
                name="dateOfBirth"
                required
                placeholder={dobInputType === 'text' ? 'DD / MM / YYYY' : undefined}
                className="w-full border border-[#C2C3C4] rounded-lg px-4 py-3 bg-white focus:border-blue-500 focus:outline-none"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                onFocus={handleDobFocus}
                onBlur={handleDobBlur}
              />
              {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2">Email address</label>
              <input type="mail" name='email' required placeholder="Enter email address"
                className="w-full border border-[#C2C3C4] rounded-lg px-4 py-3 bg-white focus:border-blue-500 focus:outline-none"
                onChange={handleInputChange}
                value={formData.email}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter password"
                  className="w-full border border-[#C2C3C4] rounded-lg px-4 py-3 bg-white focus:border-blue-500 focus:outline-none"
                />
                <IonIcon
                  slot="end"
                  icon={showPassword ? eye : eyeOff}
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-600 absolute right-4 top-[25%] w-6 h-6"
                />
              </div>
              <p className={`text-sm mt-2 text-gray-600 ${errors.password && "text-red-500"}`}>
                Password should contain at least 8 characters, 1 special symbol character, 1 number, 1 uppercase letter
              </p>
            </div>
            <div className="mb-6">
              <label className="block mb-2">Confirm password</label>
              <div className='relative'>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Confirm password"
                  className="w-full border border-[#C2C3C4] rounded-lg px-4 py-3 bg-white focus:border-blue-500 focus:outline-none"
                />
                <IonIcon
                  slot="end"
                  icon={showConfirmPassword ? eye : eyeOff}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-600 absolute right-4 top-[25%] w-6 h-6"
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
            <div className="flex items-center">
              <IonCheckbox className="mr-2" checked={acceptedTerms} onIonChange={e => setAcceptedTerms(e.detail.checked)} />
              <IonLabel>
                I agree to the <a href="/terms" className="text-blue-500 underline">Terms and Conditions</a> and <a href="/privacy-policy" className="text-blue-500 underline">Privacy Policy</a> of this app.
                {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
              </IonLabel>
            </div>
            <IonButton expand="block" type="submit" className="m-0 mt-[92px] text-base h-12 rounded-lg normal-case" disabled={!isFormValid()}>Create Account</IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccountPage;

