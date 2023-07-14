import styles from '../styles/Tweet.module.css';

function Tweet() {

    fetch('http://localhost:3000/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({firstname: signInFirstname, username: signInUsername, password: signInPassword }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({firstname: signInFirstname, username: signInUsername, token: data.token}));
					setSignInFirstname('');
					setSignInUsername('');
					setSignInPassword('');
				
				}
			});

	const likeClick = () => {
		props.selectTweet(idPost);
	  };
	  
	const handleClickremove = () => {
		props.removeTweet(idPost);
	};

    const handleClicklogout = () => {
        return
    }

	return (
		<div className={styles.container}>
            <div classNma={styles.container}>
            <button className={styles.logoutBtn} onClick={() => handleClicklogout()}>log Out</button>
			</div>
            <div className={styles.container}>

            <button className={styles.TweetBtn} onClick={() => TweetClick()}>Tweet</button>
            </div>
			<div className={styles.container}>
            <img className={styles.images} src={props.image}/>    
            <h2 className={styles.name}>{props.name}</h2>
            <p className={styles.content}>{props.content}</p>
			<button className={styles.likeBtn} onClick={() => likeClick()}>Select</button>
			<button className={styles.removeBtn} onClick={() => handleClickremove()}>Delete </button>
            </div>
            <div classNma={styles.container}>
            <p className={styles.hackatweet}>#Hackatweet</p>
            <p className={styles.first}>#First</p>
            <p className={styles.cenation}>#Cenation</p>
			</div>
		</div>
	);
}

export default Tweet;
