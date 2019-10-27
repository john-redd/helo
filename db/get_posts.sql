select p.post_id, p.title, p.img, p.content, u.username, u.profile_pic, u.user_id
from posts p
join users u on p.user_id = u.user_id;