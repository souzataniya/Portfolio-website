'use client';

import Image from "next/image";
import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplashCursor from "@/components/reactbits/SplashCursor";
import BlurText from "@/components/reactbits/BlurText";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Section refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const nameSectionRef = useRef<HTMLDivElement>(null);
  const socialEmailLinkRef = useRef<HTMLAnchorElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  
  const skillSectionRef1 = useRef<HTMLDivElement>(null);
  const skillSectionRef2 = useRef<HTMLDivElement>(null);
  const skillSectionRef3 = useRef<HTMLDivElement>(null);
  const skillSectionRefs = useMemo(() => [skillSectionRef1, skillSectionRef2, skillSectionRef3], []);
  
  const experienceRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Load Reveal (Hero)
      const tl = gsap.timeline();
      tl.fromTo(
        [aboutSectionRef.current, nameSectionRef.current],
        { opacity: 0, y: 80, scale: 0.95, filter: "blur(10px)" },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: "blur(0px)",
          duration: 1.5, 
          ease: "expo.out", 
          stagger: 0.2 
        }
      );

      // Social links magnetic-like enter
      tl.fromTo(
        ".socialLink",
        { opacity: 0, y: 40, rotation: 5 },
        { opacity: 1, y: 0, rotation: 0, duration: 1, ease: "power4.out", stagger: 0.1 },
        "-=1.2"
      );

      // 2. Scrub Parallax for Skills
      skillSectionRefs.forEach((ref) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { opacity: 0.2, y: 150, scale: 0.95, rotationX: 10 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 95%",
                end: "top 60%",
                scrub: 1.5,
              },
            }
          );
        }
      });

      // 3. Staggered Experience Cards with Clip Path Reveal
      if (experienceRef.current) {
        const experienceItems = experienceRef.current.querySelectorAll('.companyBox, .experienceItem');
        gsap.fromTo(
          experienceItems,
          { opacity: 0, y: 100, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: experienceRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      // Achievements Section Reveal
      if (achievementsRef.current) {
        const achievementCards = achievementsRef.current.querySelectorAll('.achievementCard');
        gsap.fromTo(
          achievementCards,
          { opacity: 0, y: 100, clipPath: "inset(100% 0% 0% 0%)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      }

      // 4. Oryzo-like Parallax Projects Cards
      if (projectsContainerRef.current) {
        const projects = projectsContainerRef.current.querySelectorAll('.projects');
        projects.forEach((proj) => {
          const img = proj.querySelector('.projectImg');
          
          // Outer card smooth entry
          gsap.fromTo(proj,
            { opacity: 0, y: 200, scale: 0.9 },
            {
              opacity: 1, y: 0, scale: 1, 
              ease: "expo.out",
              scrollTrigger: {
                trigger: proj,
                start: "top 90%",
                end: "top 50%",
                scrub: 1.2
              }
            }
          );

          // Inner image slight un-zooming parallax effect
          if (img) {
            gsap.fromTo(img,
              { scale: 1.2, rotation: 1 },
              {
                scale: 1, rotation: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: proj,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
                }
              }
            );
          }
        });
      }

      // 5. Contact Section Dramatic Reveal
      if (contactRef.current) {
        gsap.fromTo(
          contactRef.current,
          { opacity: 0, y: 200, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 95%",
              end: "center 70%",
              scrub: 1.5,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [skillSectionRefs]);

  return (
    <div className="container" ref={containerRef}>
      <SplashCursor BACK_COLOR={{ r: 0, g: 0, b: 0 }} TRANSPARENT={true} RAINBOW_MODE={false} COLOR="#333333" SPLAT_RADIUS={0.3} SPLAT_FORCE={7000} />
      <div className="navbar">
        <div className="nameLink">TANIYA SOUZA ©</div>
        <div className="pageLinks desktopLinks">
          <a href="#skills">skills</a>
          <a href="#experience">experience</a>
          <a href="#achievements">achievements</a>
          <a href="#projects">projects</a>
          <a href="#contact">contact</a>
        </div>
        <button 
          className={`mobileMenuBtn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="menuLine line1"></div>
          <div className="menuLine line2"></div>
        </button>
      </div>

      <div className={`mobileMenuOverlay ${isMobileMenuOpen ? 'isOpen' : ''}`}>
        <div className="mobileMenuLinks">
          <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
          <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
          <a href="#achievements" onClick={() => setIsMobileMenuOpen(false)}>Achievements</a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
        <div className="mobileMenuFooter">
          <a href="mailto:taniyasouza@gmail.com">taniyasouza@gmail.com</a>
        </div>
      </div>

      <div className="about">
        <div className="aboutSection" ref={aboutSectionRef}>
          <Image className="myPic" alt="Taniya Souza" src="/myPic.png" width={400} height={400} />
          <div className="fieldSection">
            <div>Taniya Souza</div>
            <div className="fieldName">Software engineer</div>
          </div>
        </div>
        <div className="nameSection" ref={nameSectionRef}>
          <BlurText text="ABOUT" className="aboutHeading" delay={150} animateBy="letters" />
          <span>
            I'm an AI Product Engineer and builder who loves turning complex models into lightning-fast, user-friendly products. Whether I'm building data pipelines that analyze GitHub at scale or optimizing LLM latency for applications, my focus is bridging the gap between cutting-edge AI and practical reality. Fun fact: I once debugged an issue for 3 hours only to discover it was a missing semicolon. We don't talk about that.
          </span>
        </div>
      </div>

      <div className="socials" ref={socialLinksRef}>
        <a className="socialLink socialEmailLink" ref={socialEmailLinkRef} href="mailto:taniyasouza@gmail.com">email.</a>
        <a className="socialLink" href="/Taniya_Souza_.pdf" download>resume.</a>
        <a className="socialLink" href="https://www.linkedin.com/in/taniya-souza-284167203/" target="_blank" rel="noopener noreferrer">linkedIn.</a>
        <a className="socialLink" href="https://github.com/chemicoholic21" target="_blank" rel="noopener noreferrer">github.</a>
      </div>

      <div className="skills" id="skills">
        <div className="skillSection" id="front" ref={skillSectionRefs[0]}>
          <div className="skillHeader">Frontend. <span style={{fontSize: '0.6em', opacity: 0.6}}>(aka making pixels behave)</span></div>
          <div className="skillNameSection">
            <div className="skillName">ReactJS</div>
            <div className="skillName">HTML & CSS</div>
            <div className="skillName">JavaScript</div>
            <div className="skillName">TypeScript</div>
            <div className="skillName">Tailwind CSS</div>
            <div className="skillName">Storybook</div>
            <div className="skillName">Figma</div>
            <div className="skillName">Stack Overflow</div>
          </div>
        </div>
        <div className="skillSection" id="back" ref={skillSectionRefs[1]}>
          <div className="skillHeader">Backend. <span style={{fontSize: '0.6em', opacity: 0.6}}>(where the real magic happens)</span></div>
          <div className="skillNameSection">
            <div className="skillName">NodeJS</div>
            <div className="skillName">ExpressJS</div>
            <div className="skillName">MongoDB</div>
            <div className="skillName">AWS</div>
            <div className="skillName">Supabase</div>
            <div className="skillName">Qdrant</div>
            <div className="skillName">REST APIs</div>
            <div className="skillName">LLM/AI integrations</div>
            <div className="skillName">CI/CD</div>
            <div className="skillName">MySQL</div>
          </div>
        </div>
        <div className="skillSection" id="lang" ref={skillSectionRefs[2]}>
          <div className="skillHeader">Languages & Tools. <span style={{fontSize: '0.6em', opacity: 0.6}}>(my comfort zone)</span></div>
          <div className="skillNameSection">
            <div className="skillName">Python</div>
            <div className="skillName">Next.js</div>
            <div className="skillName">SQL</div>
            <div className="skillName">Linux</div>
            <div className="skillName">ESLint/Husky</div>
            <div className="skillName">Coffee (the language)</div>
          </div>
        </div>
      </div>

      <div className="experience" id="experience" ref={experienceRef}>
        <div className="experienceheading">EXPERIENCE</div>
        <div className="companyBox">
          <div className="companyName">Cognizant AI Labs</div>
          <div className="companyPeriod">September 2026 – Present</div>
          <div className="companySkills">
            <div className="companySkillName">Junior Research Engineer</div>
          </div>
        </div>
        <div className="experienceItem">
          <div className="experienceName">Junior Research Engineer</div>
          <div className="experienceDesc">
          Building internal tools for AI research and development at Cognizant AI Labs.
          </div>
        </div>
        <div className="companyBox">
          <div className="companyName">Indhic AI</div>
          <div className="companyPeriod">Jan 2026 – Feb 2026</div>
          <div className="companySkills">
            <div className="companySkillName">AI Engineer</div>
            <div className="companySkillName">Consultant</div>
            <div className="companySkillName">Contract</div>
          </div>
        </div>
        <div className="experienceItem">
          <div className="experienceName">AI Engineer Consultant (Contract), Bengaluru</div>
          <div className="experienceDesc">
          Comparative analysis of healthcare LLMs (MedGemma vs Gemini Flash 2.5 & 3.0) across clinical reasoning, cost, latency, and deployment. Extracted treatment-planning algorithms from STOPP/START frameworks.
          </div>
        </div>
        <div className="companyBox">
          <div className="companyName">Grapevine (Series-A)</div>
          <div className="companyPeriod">July 2025 – Jan 2026</div>
          <div className="companySkills">
            <div className="companySkillName">AI Product Engineer</div>
            <div className="companySkillName">Intern</div>
          </div>
        </div>
        <div className="experienceItem">
          <div className="experienceName">AI Product Engineer Intern, Bengaluru</div>
          <div className="experienceDesc">
          Deployed LLM-powered conversational and voice AI using Gemini, ElevenLabs, and Google Voice. Migrated n8n workflows to Python, reducing execution time by ~97%. Built embedding-based resume tagging and search pipelines using Qdrant. Built backend automation for job discovery and outreach at scale.
          </div>
        </div>
        <div className="companyBox">
          <div className="companyName">frog by Capgemini</div>
          <div className="companyPeriod">January 2025 - June 2025</div>
          <div className="companySkills">
            <div className="companySkillName">ReactJS</div>
            <div className="companySkillName">TypeScript</div>
            <div className="companySkillName">Next.js</div>
          </div>
        </div>
        <div className="experienceItem">
          <div className="experienceName">Frontend / Design technologist</div>
          <div className="experienceDesc">
          Automated insurance policy verification using n8n and DeepOpinion. Built reusable, accessible UI components with React, TypeScript, Tailwind, and Storybook. Delivered a full-stack journaling app with Supabase and enforced coding standards via ESLint/Husky.
          </div>
        </div>
      </div>

      <div className="achievements" id="achievements" ref={achievementsRef}>
        <div className="achievementsHeading">ACHIEVEMENTS</div>
        <div className="achievementsSubtitle">Hackathon Wins</div>
        <div className="achievementCard">
          <div className="achievementNumber">01</div>
          <div className="achievementContent">
            <div className="achievementTitle">Blitz : Sarvam X Monad</div>
            <div className="achievementOrg">Monad Sarvam</div>
            <div className="achievementMeta">
              <span className="achievementPrize">Winner</span>
              <span className="achievementYear">07.06.2026</span>
            </div>
            <div className="achievementTags">
              <a className="achievementTag" href="https://www.instagram.com/p/DZeUuQlJSGs/" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram Post
              </a>
              <a className="achievementTag" href="https://x.com/rafeeque_w3k/status/2065074832891682975" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Twitter Post
              </a>
            </div>
          </div>
        </div>
        <div className="achievementCard">
          <div className="achievementNumber">02</div>
          <div className="achievementContent">
            <div className="achievementTitle">AWS X Elastic's Hacknight : AI Agents</div>
            <div className="achievementOrg">Elastic AWS</div>
            <div className="achievementMeta">
              <span className="achievementPrize">Winner</span>
              <span className="achievementYear">09.05.2026</span>
            </div>
            <div className="achievementTags">
              <a className="achievementTag" href="https://www.linkedin.com/feed/update/urn:li:activity:7459210115569696768/" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn Post
              </a>            </div>
          </div>
        </div>
        <div className="achievementCard">
          <div className="achievementNumber">03</div>
          <div className="achievementContent">
            <div className="achievementTitle">CodeSprint 2.0</div>
            <div className="achievementOrg">Nitte Meenakshi Institute of Technology, Yelahanka</div>
            <div className="achievementMeta">
              <span className="achievementPrize">Winner</span>
              <span className="achievementYear">02.05.2024</span>
            </div>
            <div className="achievementTags">
              <a className="achievementTag" href="https://www.linkedin.com/feed/update/urn:li:activity:7193158814043455488/" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn Post
              </a>            </div>
          </div>
        </div>
        <div className="achievementCard">
          <div className="achievementNumber">04</div>
          <div className="achievementContent">
            <div className="achievementTitle">amBITion 24hr National Level Hackathon</div>
            <div className="achievementOrg">Bangalore Institute of Technology</div>
            <div className="achievementMeta">
              <span className="achievementPrize">2nd Runners-up</span>
              <span className="achievementYear">07.07.2024</span>
            </div>
            <div className="achievementTags">
              <a className="achievementTag" href="https://www.linkedin.com/feed/update/urn:li:activity:7216516224954875904/" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn Post
              </a>            </div>
          </div>
        </div>
        <div className="achievementCard">
          <div className="achievementNumber">05</div>
          <div className="achievementContent">
            <div className="achievementTitle">National Social Hackathon 2024</div>
            <div className="achievementOrg">CMR Institute of Technology</div>
            <div className="achievementMeta">
              <span className="achievementPrize">2nd Runners-up</span>
              <span className="achievementYear">31.05.2024</span>
            </div>
            <div className="achievementTags">
              <a className="achievementTag" href="https://www.linkedin.com/feed/update/urn:li:activity:7204771618571644928/" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn Post
              </a>            </div>
          </div>
        </div>
      </div>

      <div id="projects" ref={projectsContainerRef} style={{ display: 'flex', flexDirection: 'column', gap: '6vw' }}>
        <div className="projectsHeading">PROJECTS</div>
        <div className="projects">
          <div className="projectHeader">
            <div>
              <div className="projectName">Proof of Synergy</div>
              <div className="projectDesc">
                <ul className="projectDescList">
                  <li><strong>Goal:</strong> Build an AI communication gym where users rehearse real conversations with adaptive AI partners in their own language.</li>
                  <li><strong>Impact:</strong> Combined speech, conversation, and memory so growth is captured in a persistent Skill Knowledge Graph that remembers across sessions.</li>
                  <li><strong>Tech:</strong> Sarvam, Gemini, Cognee, Next.js.</li>
                </ul>
              </div>
            </div>
            <a href="https://pos-eight-omega.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Image className="projectLink" src="/linkArrow.png" alt="link" width={52} height={52} />
            </a>
          </div>
          <a href="https://github.com/chemicoholic21/Proof-Of-Synergy" target="_blank" rel="noopener noreferrer" style={{ overflow: 'hidden', borderRadius: '24px' }}>
            <Image className="projectImg" src="/proof_of_synergy_mockup.png" alt="Proof of Synergy" width={1600} height={900} />
          </a>
        </div>

        <div className="projects">
          <div className="projectHeader">
            <div>
              <div className="projectName">GitPullTalent</div>
              <div className="projectDesc">
                <ul className="projectDescList">
                  <li><strong>Goal:</strong> Streamline tech hiring by replacing subjective resumes with quantitative GitHub activity metrics.</li>
                  <li><strong>Impact:</strong> Engineered a robust ranking system evaluating commit quality, PR frequency, and repo health.</li>
                  <li><strong>Tech:</strong> TypeScript, Next.js, BullMQ.</li>
                </ul>
              </div>
            </div>
            <a href="https://gitpulltalent.vercel.app" target="_blank" rel="noopener noreferrer">
              <Image className="projectLink" src="/linkArrow.png" alt="link" width={52} height={52} />
            </a>
          </div>
          <a href="https://gitpulltalent.vercel.app" target="_blank" rel="noopener noreferrer" style={{ overflow: 'hidden', borderRadius: '24px' }}>
            <Image className="projectImg" src="/gitpulltalent_mockup.png" alt="GitPullTalent" width={1600} height={900} />
          </a>
        </div>

        <div className="projects">
          <div className="projectHeader">
            <div>
              <div className="projectName">github-data-pipeline</div>
              <div className="projectDesc">
                <ul className="projectDescList">
                  <li><strong>Goal:</strong> Build a headless data pipeline for processing and analyzing large-scale GitHub repository data.</li>
                  <li><strong>Impact:</strong> Designed scalable ingestion and caching strategies, handling real-time rate limiting and large payloads.</li>
                  <li><strong>Tech:</strong> TypeScript, BullMQ, Drizzle ORM, Postgres, Redis.</li>
                </ul>
              </div>
            </div>
            <a href="https://github.com/chemicoholic21/github-data-pipeline" target="_blank" rel="noopener noreferrer">
              <Image className="projectLink" src="/linkArrow.png" alt="link" width={52} height={52} />
            </a>
          </div>
          <a href="https://github.com/chemicoholic21/github-data-pipeline" target="_blank" rel="noopener noreferrer" style={{ overflow: 'hidden', borderRadius: '24px' }}>
            <Image className="projectImg" src="/github_data_pipeline_mockup.png" alt="github-data-pipeline" width={1600} height={900} />
          </a>
        </div>

        <div className="projects">
          <div className="projectHeader">
            <div>
              <div className="projectName">Fitness App</div>
              <div className="projectDesc">
                <ul className="projectDescList">
                  <li><strong>Goal:</strong> Monitor user posture and movements in real-time to provide automated physical feedback.</li>
                  <li><strong>Impact:</strong> Implemented AI-driven posture detection, integrating seamless communication between the frontend and the AI server.</li>
                  <li><strong>Tech:</strong> OpenCV, Python, React, AWS.</li>
                </ul>
              </div>
            </div>
            <a href="https://github.com/chemicoholic21" target="_blank" rel="noopener noreferrer">
              <Image className="projectLink" src="/linkArrow.png" alt="link" width={52} height={52} />
            </a>
          </div>
          <a href="https://github.com/chemicoholic21" target="_blank" rel="noopener noreferrer" style={{ overflow: 'hidden', borderRadius: '24px' }}>
            <Image className="projectImg" src="/fitness_app_mockup.png" alt="Fitness App" width={1600} height={900} />
          </a>
        </div>

        <div className="projects">
          <div className="projectHeader">
            <div>
              <div className="projectName">JournalMind</div>
              <div className="projectDesc">
                <ul className="projectDescList">
                  <li><strong>Goal:</strong> Create a full-stack, aesthetically pleasing progressive web application for journaling.</li>
                  <li><strong>Impact:</strong> Architected a robust, minimal design system with instantaneous interactions leveraging SSR.</li>
                  <li><strong>Tech:</strong> Next.js, TypeScript, Tailwind CSS, Supabase.</li>
                </ul>
              </div>
            </div>
            <a href="https://github.com/tsouza1007/JM" target="_blank" rel="noopener noreferrer">
              <Image className="projectLink" src="/linkArrow.png" alt="link" width={52} height={52} />
            </a>
          </div>
          <a href="https://github.com/tsouza1007/JM" target="_blank" rel="noopener noreferrer" style={{ overflow: 'hidden', borderRadius: '24px' }}>
            <Image className="projectImg" src="/journalmind_mockup.png" alt="JournalMind" width={1600} height={900} />
          </a>
        </div>

        <div className="projects">
          <div className="projectHeader">
            <div>
              <div className="projectName">Image Processing AI</div>
              <div className="projectDesc">
                <ul className="projectDescList">
                  <li><strong>Goal:</strong> Automate complex image editing tasks like precise object removal and generative fill.</li>
                  <li><strong>Impact:</strong> Orchestrated three state-of-the-art vision models to pipeline a localized inpainting system in Python.</li>
                  <li><strong>Tech:</strong> Grounding DINO, Segment Anything (SAM), Stable Diffusion XL.</li>
                </ul>
              </div>
            </div>
            <a href="https://colab.research.google.com/drive/1YGKV5TSSjF9UAfWZiulkk8t1GDxN6ysD" target="_blank" rel="noopener noreferrer">
              <Image className="projectLink" src="/linkArrow.png" alt="link" width={52} height={52} />
            </a>
          </div>
          <a href="https://colab.research.google.com/drive/1YGKV5TSSjF9UAfWZiulkk8t1GDxN6ysD" target="_blank" rel="noopener noreferrer" style={{ overflow: 'hidden', borderRadius: '24px' }}>
            <Image className="projectImg" src="/image_processing_mockup.png" alt="AI PIPELINE" width={1600} height={900} />
          </a>
        </div>

        <div className="projects">
          <div className="projectHeader">
            <div>
              <div className="projectName">Positivus</div>
              <div className="projectDesc">
                <ul className="projectDescList">
                  <li><strong>Goal:</strong> Develop an award-winning layout for a digital marketing agency interface.</li>
                  <li><strong>Impact:</strong> Achieved a highly expressive design with buttery smooth micro-interactions that elevate brand perception.</li>
                  <li><strong>Tech:</strong> ReactJS, Tailwind CSS, GSAP.</li>
                </ul>
              </div>
            </div>
            <a href="https://github.com/tsouza1007/Hackathon" target="_blank" rel="noopener noreferrer">
              <Image className="projectLink" src="/linkArrow.png" alt="link" width={52} height={52} />
            </a>
          </div>
          <a href="https://github.com/tsouza1007/Hackathon" target="_blank" rel="noopener noreferrer" style={{ overflow: 'hidden', borderRadius: '24px' }}>
            <Image className="projectImg" src="/positivus_mockup.png" alt="Positivus" width={1600} height={900} />
          </a>
        </div>

        <div className="projects">
          <div className="projectHeader">
            <div>
              <div className="projectName">Travel Planner</div>
              <div className="projectDesc">
                <ul className="projectDescList">
                  <li><strong>Goal:</strong> Provide a unified hub for tourists to generate, map, and organize smart itineraries dynamically.</li>
                  <li><strong>Impact:</strong> Integrated live data sources to accurately assemble travel timelines.</li>
                  <li><strong>Tech:</strong> React, APIs, Maps Integration.</li>
                </ul>
              </div>
            </div>
            <a href="https://github.com/chemicoholic21/Travel-Planner" target="_blank" rel="noopener noreferrer">
              <Image className="projectLink" src="/linkArrow.png" alt="link" width={52} height={52} />
            </a>
          </div>
          <a href="https://github.com/chemicoholic21/Travel-Planner" target="_blank" rel="noopener noreferrer" style={{ overflow: 'hidden', borderRadius: '24px' }}>
            <Image className="projectImg" src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=1600" alt="Travel Planner" width={1600} height={900} />
          </a>
        </div>
      </div>

      <div className="contact" id="contact" ref={contactRef}>
        <BlurText text="Let's get started." className="contactName" animateBy="words" delay={100} />
        <p style={{opacity: 0.7, fontSize: '0.9rem', marginBottom: '1rem'}}>Warning: I respond faster than my code compiles</p>
        <a className="contactButton" href="mailto:taniyasouza@gmail.com">
          taniyasouza@gmail.com
        </a>
        <div className="pageLinks" style={{ marginTop: '2vw' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Back to Top</a>
        </div>
      </div>

      <div className="footer">
        <div className="nameLink">Taniya Souza.</div>
        <div className="footerRight">all rights reserved © 2026</div>
      </div>
    </div>
  );
}
