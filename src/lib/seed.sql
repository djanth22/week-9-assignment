
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  userID TEXT UNIQUE,
  user_name TEXT,
  bio TEXT,
  join_date DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS week_9_posts(
    id SERIAL PRIMARY KEY,
    name TEXT,
    post TEXT,
    posted_at TIMESTAMP DEFAULT NOW(),
    user_id TEXT REFERENCES users(userID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS week_9_comments (
    id SERIAL PRIMARY KEY,
    name TEXT ,
    comment TEXT,
    posted_at TIMESTAMP DEFAULT NOW(),
    post_id INTEGER REFERENCES week_9_posts(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(userID) ON DELETE CASCADE
);




INSERT INTO users (userID, user_name, bio) VALUES ('ben0455', 'ben', 'just a guy'),('dom22981','Dom','hotel staff, love my job'),('Nissa55','Nissa','dont talk to me'),('Vahleth019832','Vahleth','dealmaker, its my job to get you what you desire'),('Tina099821','Tina','I''m a strong confident person that enjoys making people''s lives better'),('Tim9983','Tim','I have no clue what i''m doing here'),('Mark22','Mark','love video games and having fun'),('sam9085','sam','night dweller'),('Dyllan236','dyllan','what do I put here'),('Penny5511','penny','comics for life'),('Zack88731','zack','games, just games') ON CONFLICT (userID) DO NOTHING;

CREATE TABLE IF NOT EXISTS follow(
  id SERIAL PRIMARY KEY,
  er_ing TEXT UNIQUE,
  following TEXT,
  follow Boolean,
  follower_fkey TEXT 
);

INSERT INTO follow (er_ing, following, follow, follower_fkey) VALUES ('davebob','bob','no','dave'), ('bobdave','dave','no','bob') ON CONFLICT (er_ing) DO UPDATE SET follow = EXCLUDED.follow;

INSERT INTO week_9_posts(name, post, user_id) VALUES('ben','wow, another update....yay....still no progress on the 3rd floor noise though','ben0455'),('Vahleth','anyone fancy popping by my room later for a drink?','Vahleth019832'),('ben','how''s everyone liking the update then?','ben0455'),('Nissa','what''s everyone doing this weekend? No boring answers please','Nissa55'),('Mark','I dont get it....is this still an official thing or is this seperate?','Mark22'),('Dom','can''t wait to get the week over with, too much going on','dom22981'),('sam','having one of those days where things aren''t going to plan','sam9085'),('Dyllan','anyone out tonight?','Dyllan236'),('Penny','seen hunters near the gas station thats cool first time I''ve seen them','Penny5511'),('zack','someone who isn''t boring do something tonight, usual drinkling buddy is MIA','Zack88731');

INSERT INTO week_9_comments (name, comment, post_id, user_id) VALUES ('mark','come on man you gotta complain so much','1','Mark22'),('ben','yeah mark, I do','1','ben0455'),('Nissa','ben cant help himself','1','Nissa55'),('sam','you''re both as bad as each other','1','sam9085'),('Dyllan','not terrible','3','Dyllan236'),('zack','could be worse','3','Zack88731'),('Nissa','Oh no, what happened Dom? need to stop by for a chat when you''re not working?','6','Nissa55'),('Dom','I''ll live, just been a tad stressful with work lately is all','6','dom22981'),('Nissa','well I''m here if you need to talk, you know where I''ll be','6','Nissa55'),('Tim','hope things are better soon man','6','Tim9983'),('ben','someone have a crush?','6','ben0455'),('Penny','leave her alone ben, hope things get better Dom','6','Penny5511'),('Penny','whats up?','7','Penny5511'),('sam','Just a bad week','7','sam9085'),('Tina','wasnt a 67 chevy was it?','9','Tina099821');


CREATE TABLE IF NOT EXISTS postlikes(
  id SERIAL PRIMARY KEY,
  user_name TEXT,
  likes BOOLEAN,
  dislikes BOOLEAN,
  uni TEXT UNIQUE,
  post_id INTEGER REFERENCES week_9_posts (id)
);

CREATE TABLE IF NOT EXISTS commentlikes(
  id SERIAL PRIMARY KEY,
  user_name TEXT,
  likes BOOLEAN,
  dislikes BOOLEAN,
  uni TEXT UNIQUE,
  comments_id INTEGER REFERENCES week_9_comments (id)
);

INSERT INTO postlikes (user_name, likes, dislikes, post_id) VALUES ('Mark22','yes','no','1'),('Nissa55','no','yes','1'),('Vahleth019832','no','yes','1'),('Nissa55','yes','no','6'),('Penny5511','yes','no','6'),('Tim9983','yes','no','6'),('Tina099821','yes','no','6');