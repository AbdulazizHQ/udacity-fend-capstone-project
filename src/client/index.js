import {handleSubmit} from './js/app'
import './styles/resets.scss'
import './styles/main.scss'

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', handleSubmit);

export {
   handleSubmit
}