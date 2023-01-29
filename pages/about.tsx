import Layout from '@/components/Layout'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
	return (
		<Layout hasSidebar={false}>
			<article>
				<h1 className='text-primary text-5xl uppercase'>About me</h1>
				<em>Who am I?</em>
			</article>
			<div className='flex items-start gap-10'>
				<Image className='rounded-2xl' width={500} height={500} alt='Profile picture of Francesco Denaro' src={'/profile.webp'} />
			<section className='prose prose-xl prose-h2:text-primary prose-h2:text-2xl'>
				<h2>HEY, GLAD TO SEE YOU!</h2>	
				<p>
					My name is Francesco, and I am a self-taught front-end developer. I’m from Italy and currently based in Brussels.
					In this blog I will share tips and resources that I gathered during the last years on being a self-taught developer. I will share my personal experience to demonstrate that everyone can learn how to code and become a programmer.
				</p>
				<h2>ABOUT ME</h2>
				<p>
					I started learning front-end development while studying engineering at university about five years ago. Writing HTML and CSS was so interesting that eventually, I decided to drop my studies and focus only on web development. At that time, I worked for an e-commerce shop, taking care of customer service during the day. Instead, during the night, I learned Javascript and Bootstrap to build my first websites.
				</p>

				<h2>150 COMMENTS ON A PULL REQUEST</h2>
				<p>
					After seven months and about 50 applications, I landed my first junior front-end job in Prague. That was a significant achievement! I studied everything independently without prior knowledge, with just the right motivation, and finally got my first job. In Prague, I had the chance to learn how to work within a company. I learned how to write reusable code, what is a pull request (and how to get 150 comments on it from senior devs), and more. Even if the road was, and still is, very long, I realized that that was the first big step.
				</p>

				<h2>GETTING BETTER</h2>
				<p>
					Eventually, I got better. The screen hours kept growing, and my understanding of web technologies went from basic to not-so-basic. 
				</p>
				<p>
					Today, after five years, I work as a front-end developer and I am happy with what I do. Most importantly, I feel great because I achieved that thanks to myself. 
					Recently, a couple of friends of mine started looking into web development. While helping them, I noticed that I was always giving them similar tips.
					I was sending them in the same direction, sending the same links and YouTube videos, and finding “advising patterns” that, in the end, helped them. One of them already got his first job. Sometimes, we exchange some learning tips and resources that I believe to be very valuable. 
				</p>
				‍<p>
					Well then, why not doing that on a bigger scale? Why not share that knowledge with people interested in starting or improving their programming career then? I have always loved to talk about what I do, about programming languages, technology, and much “nerdy” stuff.
					Now that I can share something valuable, why not?
				</p>
				<p>
					To get started, take a <Link className='text-primary' href='/posts'>look at my posts!</Link> 
				</p>
			</section>
			</div>

		</Layout>
	)
}
