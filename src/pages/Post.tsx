import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import { getPostFullInfoById } from '../services/posts'
import { NotPosts } from './NotPosts';
import { Notification } from '../Components/Notification';
import { formatText } from '../utils/formatter';

import { X } from 'lucide-react';

import type { Post } from '../types/post'
import { FadeIn } from '../Components/FadeIn';
import { Comments } from '../Components/Comments';

export const PostFullInfo = () => {
   const navigate = useNavigate();
   
   const { id } = useParams<{ id: string }>();
   const [postFullInfo, setPostFullInfo] = useState<Post | null>(null);
   const [loading, setLoading] = useState(true);
   const [showNotification, setShowNotification] = useState(false);

   const formatDate = (isoString: string) => {
      const date = new Date(isoString);
      const options: Intl.DateTimeFormatOptions = {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
      };
      return date.toLocaleDateString('ru-RU', options);
   };

   React.useEffect(() => {
      if (id) {
         const fetchFullInfo = async () => {
            try {
               const data = await getPostFullInfoById(Number(id));
               setPostFullInfo(data);
            } catch (error) {
               setShowNotification(true);
                  const timer = setTimeout(() => {
                     navigate('/');
                  }, 4000);
                  return () => clearTimeout(timer);
            } finally {
               setLoading(false);
            }
         };
         fetchFullInfo();
      }
   }, [id]);

   if (loading) {
      return (
         <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-[100px] h-[100px] border-5 border-[var(--color)] border-t-transparent rounded-full animate-spin'></div>
         </div>
      );
   }

   if (!postFullInfo) {
      return (
         <NotPosts notPostName='Пост не найден' notPostDescription='Попробуйте перезагрузить страницу' />
      );
   }

	return (
		<div className='container pb-15 pt-15'>
			{/* Уведомление */}
         <div className="absolute top-0 left-0 right-0">
            <Notification
               notificationIcon={
                  <X className='w-[50px] h-[50px] text-[var(--color)]' />
               }
               notificationName='Инофрмация не получена! 😓'
               notificationContent='Не получилось получить полную информацию об этом посте.'
               showNotification={showNotification}
               onClose={() => setShowNotification(false)}
            />
         </div>
			<div className='w-full h-auto rounded-2xl bg-[var(--post-bg)] pl-20 pr-20 pt-13 pb-15 max-[580px]:pr-12 max-[580px]:pl-12 max-[580px]:pt-10'>
				<div>
					<FadeIn delay={100}>
						<h1 className='text-4xl font-black text-[var(--color)] mb-5 max-[580px]:text-[26px]'>
							{postFullInfo?.title}
						</h1>
					</FadeIn>
					<FadeIn delay={200}>
						<h4 className='text-[18px] text-[var(--footer-text-color)] font-bold max-[580px]:text-[16px]'>
							{formatDate(postFullInfo?.createdAt)}
						</h4>
					</FadeIn>
				</div>
				{/* Основной контент с форматированием */}
				<FadeIn delay={300}>
					<div
						className='pt-10 text-[var(--color)] text-[19px] font-medium max-[580px]:text-[16px]'
						dangerouslySetInnerHTML={{
							__html: formatText(postFullInfo.fullDescription),
						}}
					/>
				</FadeIn>
			</div>

			<Comments postId={id} />
		</div>
	);
};