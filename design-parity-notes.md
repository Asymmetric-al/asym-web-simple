SPECS PAGE - Design Parity Notes



Issues Found



1\. Hero Section

\- Title mismatch: Old: "Transparent Architecture." | New: "The Architecture."

\- Description mismatch: Old has longer explanatory text, new has shorter version

\- Status Badge: Old has "TECH MANIFEST v2.1.0" (all caps), new has "Tech Manifest v2.1.0" (title case)



2\. Stack Cards (Tech Stack Grid)

\- Grid layout: Old uses 3-column grid consistently | New uses responsive grid with varying column spans

\- Card styling: Old has clean cards with tags/links | New has simpler design with only descriptions

\- Interactive elements: Old cards have hover effects and external links | New lacks these

\- Missing content: New doesn't include technology URLs/links



3\. Performance Targets Section

\- Layout: Old uses 2x3 grid | New uses different layout

\- Styling: Old has minimal border styling | New has glow effects and different spacing

\- Visual hierarchy: Different treatment of metric values



4\. Background/Visual Elements

\- Old uses DitherGrid + DitherGlobe components

\- New uses page-shell-glow classes

\- Different visual atmosphere



Matching Elements

\- Core content (stack categories, metrics, release gates) is the same

\- Release gates checklist items match

\- Overall page purpose and messaging aligned



Fix Recommendations



Priority 1 (Visual Parity)

1\. Update hero title to "Transparent Architecture."

2\. Restore full hero description text

3\. Make status badge uppercase "TECH MANIFEST"

4\. Adjust stack cards grid to consistent 3 columns



Priority 2 (Functionality)

1\. Add technology links to stack cards

2\. Restore hover effects on cards

3\. Match performance metrics styling



Priority 3 (Polish)

1\. Consider adding DitherGrid/DitherGlobe components

2\. Match spacing and padding values

3\. Ensure responsive behavior matches



\---



\# MANIFESTO PAGE - Design Parity Notes

(Old: Philosophy.tsx | New: manifesto/page.tsx)



Issues Found



1\. Hero Section

\- Title: Old: "Small Inputs. Exponential Outputs." | New: Same ✅

\- Eyebrow: Old: "THE PHILOSOPHY // V1.0" (all caps) | New: "The Philosophy // v1.0" (title case) - case mismatch

\- Description: Old has longer description | New has shorter version



2\. Missing Quote Block

\- Old has a prominent quote: "Consider the mustard seed—how God multiplies the smallest unit into the largest capacity."

\- New completely missing this element



3\. Staffing Model Section (Chapter 4)

\- Old: TechPanel with "STAFFING ARCHITECTURE" showing support-raised staff details and governance details

\- New: Simplified card with less detailed content

\- Old has two sub-sections with icons, new has one generic section



4\. Values Section (Chapter 5)

\- Old: "We operate with open hands" with Statement of Faith link and signature card

\- New: "Our Posture" section with similar messaging but different visual treatment



5\. Background/Visual Elements

\- Old uses DitherGlobe + GridPattern throughout

\- New uses page-shell-glow classes

\- Different visual atmosphere



Matching Elements

\- Chapter structure (01, 02, 03, 04, 05) matches

\- Core messaging and philosophy aligns

\- "Minimize Clicks. Maximize Ministry." phrase present in both



Fix Recommendations



Priority 1 (Visual Parity)

1\. Make eyebrow uppercase: "THE PHILOSOPHY // V1.0"

2\. Restore full hero description text

3\. Add missing quote block with proper styling (border-left, italic, background)



Priority 2 (Content Parity)

1\. Restore detailed Staffing Model section with support-raised staff and governance details

2\. Add icons and proper formatting for staffing section

3\. Ensure "Statement of Faith" link is present



Priority 3 (Polish)

1\. Consider adding DitherGlobe/GridPattern backgrounds

2\. Match spacing and padding values

3\. Ensure consistent visual hierarchy



\---



\# JOIN PAGE - Design Parity Notes



Issues Found



1\. Hero Section

\- Title mismatch: Old: "Your code. Their mission." | New: "Technical, warm, and pointed at the field."

\- Eyebrow mismatch: Old: "OPEN RECRUITMENT" | New: "Join the Build"

\- Description mismatch: Old has specific call to builders | New has different messaging



2\. Pathways Section (How to Engage)

\- Old: 3 cards - Full-Time Staff, Internships, Open Source

\- New: 3 lanes - Pilot agencies, Missions-minded builders, Build supporters

\- Completely different content and structure



3\. Values / Principles Section

\- Old: 3 values - Excellence as Stewardship, High-Agency Builders, Empathy for the Field

\- New: 4 principles - High agency, Technical rigor, Open hands, System thinking

\- Different content, different count



4\. Roles Board (Active Deployments)

\- Old: Has 6 active roles with detailed cards (Senior Frontend Engineer, Backend Systems Architect, etc.)

\- New: Missing this entire section



5\. Call to Action

\- Old: "Don't see your specific role?" section with contact link

\- New: Different structure with InquiryForm



6\. Background/Visual Elements

\- Old uses DitherGrid + DitherGlobe

\- New uses page-shell-glow classes



Matching Elements

\- Overall purpose (recruitment/join) matches

\- Both have pathway/engagement options

\- Both have culture/values section



Fix Recommendations



Priority 1 (Visual Parity)

1\. Restore hero title: "Your code. Their mission."

2\. Restore hero eyebrow: "OPEN RECRUITMENT"

3\. Restore hero description text



Priority 2 (Content Parity)

1\. Replace 3 lanes with original 3 pathways (Full-Time Staff, Internships, Open Source)

2\. Replace 4 principles with original 3 values (Excellence as Stewardship, High-Agency Builders, Empathy for the Field)

3\. Add Roles Board section with 6 roles (Senior Frontend Engineer, Backend Systems Architect, Database Reliability Engineer, Infrastructure Engineer, Developer Advocate, Product Designer)

4\. Add "Don't see your specific role?" CTA section



Priority 3 (Polish)

1\. Consider adding DitherGlobe/GridPattern backgrounds

2\. Match card styling and hover effects

3\. Ensure responsive behavior matches



\---



\# CONTACT PAGE - Design Parity Notes



Issues Found



1\. Hero Section

\- Title mismatch: Old: "Start the Conversation." | New: "Simple and direct."

\- Eyebrow mismatch: Old: "OPEN CHANNEL" | New: "Contact"

\- Description mismatch: Old: "Whether you are an agency ready to migrate or a builder looking to contribute, we are ready to listen." | New: Different messaging



2\. Contact Channels Section

\- Old: 3 channels with icons - General Inquiry (email), Builder Support (GitHub), Global HQ (address)

\- New: 3 tracks - Agency conversation, Giving and governance, Builder interest

\- Completely different content and structure



3\. Form Section

\- Old: Form with name, email, organization, message fields, styled like terminal

\- New: Uses InquiryForm component with different styling

\- Different visual treatment



4\. Background/Visual Elements

\- Old uses DitherGlobe + GridPattern with terminal aesthetic

\- New uses page-shell-glow classes



Matching Elements

\- Both have contact form

\- Both have 3 contact options



Fix Recommendations



Priority 1 (Visual Parity)

1\. Restore hero title: "Start the Conversation."

2\. Restore hero eyebrow: "OPEN CHANNEL"

3\. Restore hero description text



Priority 2 (Content Parity)

1\. Replace 3 tracks with original 3 channels:

&#x20;  - General Inquiry with email info@asymmetric.al

&#x20;  - Builder Support with GitHub link

&#x20;  - Global HQ with address details

2\. Add response time meta "RESPONSE TIME: \~24HRS" for email channel



Priority 3 (Polish)

1\. Restore terminal aesthetic for form section

2\. Add DitherGlobe/GridPattern backgrounds

3\. Match "Transmission Uplink" label styling

