import React, { useState, useEffect } from 'react';

interface Comment {
  name: string;
  comment: string;
}

const CommentSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false); // Toggle comments visibility
  const [comments, setComments] = useState<Comment[]>([]); // State to store comments
  const [name, setName] = useState(''); // State for the name input
  const [comment, setComment] = useState(''); // State for the comment input

  // Toggle visibility of the comments section
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  // Handle the submission of a comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Only add a comment if both name and comment are provided
    if (name && comment) {
      const newComment: Comment = { name, comment };

      // Add the new comment to the list of comments
      setComments((prevComments) => [...prevComments, newComment]);

      // Clear the input fields
      setName('');
      setComment('');
    }
  };

  // Add a predefined comment when the component is first mounted
  useEffect(() => {
    const initialComment: Comment = {
      name: 'Bob Fossil',
      comment: `Oh, I am so glad you taught me all about the big brown angry
      guys in the woods. With their sniffing little noses and their
      bad attitudes, they can sure be a menace — I was thinking of
      putting them all in a truck and driving them outta here. I run
      a zoo, you know.`,
    };

    // Pre-populate the comments state with the initial comment
    setComments([initialComment]);
  }, []); // Empty dependency array means this runs only once after initial render

  return (
    <section className="comments">
      <div className="show-hide" onClick={toggleVisibility}>
        {isVisible ? 'Hide comments' : 'Show comments'}
      </div>

      {isVisible && (
        <div className="comment-wrapper">
          <h2>Add comment</h2>

          {/* Comment Form */}
          <form className="comment-form" onSubmit={handleAddComment}>
            <div className="flex-pair">
              <label htmlFor="name">Your name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Handle input changes
                required
              />
            </div>
            <div className="flex-pair">
              <label htmlFor="comment">Your comment:</label>
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="Enter your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Handle input changes
                required
              />
            </div>
            <div>
              <input type="submit" value="Submit comment" />
            </div>
          </form>

          <h2>Comments</h2>
          <ul className="comment-container">
            {comments.map((c, index) => (
              <li key={index}>
                <p>{c.name}</p>
                <p>{c.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
