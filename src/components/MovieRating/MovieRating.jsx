// import React, { useState } from 'react';
// import axios from 'axios';

// const MovieRating = ({ movieId }) => {
//   const [rating, setRating] = useState('');
//   const [message, setMessage] = useState('');

//   const handleRatingChange = (event) => {
//     setRating(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         `https://api.themoviedb.org/3/movie/${movieId}/rating`,
//         { value: rating },
//         {
//           params: {
//             api_key: 'YOUR_API_KEY',
//             // Add any other required parameters here
//           },
//         }
//       );
//       if (response.status === 200) {
//         setMessage('Rating submitted successfully!');
//       }
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//       setMessage('Failed to submit rating.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Rate this movie:
//           <input
//             type="number"
//             min="0"
//             max="10"
//             step="0.1"
//             value={rating}
//             onChange={handleRatingChange}
//           />
//         </label>
//         <button type="submit">Submit Rating</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default MovieRating;
