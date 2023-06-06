import React, { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

function App() {
  const [emailList, setEmailList] = useState([]);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the email list from the backend on component mount
    getEmailAddresses();
  }, []);

  const getEmailAddresses = async () => {
    try {
      const response = await axios.get('${baseUrl}/email');
      setEmailList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post('${baseUrl}/email',{
        to,
        subject,
        text: message,
      });
      getEmailAddresses(''); // Fetch the updated email list
      setTo('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Send Email</h1>
      <form onSubmit={sendEmail}>
        <label htmlFor="to">To:</label>
        <input
          type="text"
          id="to"
          name="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Send Email</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>To</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {emailList.map((email) => (
            <tr key={email._id}>
              <td>{email.to}</td>
              <td>{email.subject}</td>
              <td>{email.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
