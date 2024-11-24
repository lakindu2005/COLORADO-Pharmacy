document.addEventListener('DOMContentLoaded', () => {

     // Delivery date for when Pay button is clicked
     const payButton = document.querySelector('button[type="submit"]');
     payButton.addEventListener('click', (event) => {
         event.preventDefault();
 
         const formFields = document.querySelectorAll('form input[required], form textarea[required]');
         const allFieldsFilled = Array.from(formFields).every(field => field.value.trim() !== '');
 
         if (allFieldsFilled) {
             const deliveryDate = new Date();
             deliveryDate.setDate(deliveryDate.getDate() + 2); // 2 days from now
             alert(`Thank you for your purchase! Your order will be delivered on ${deliveryDate.toDateString()}.`);
         } else {
             alert('Please fill all required fields correctly.');
         }
     });
});