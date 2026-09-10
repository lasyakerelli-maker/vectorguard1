"""
VectorGuard - Professional SIH 2026 Pitch Deck Generator
Generates a widescreen, executive-ready presentation deck for Smart India Hackathon.
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

prs = Presentation()
# Set widescreen 16:9 dimensions (13.333 x 7.5 inches)
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

# Brand Color Palette
COLOR_BG = RGBColor(21, 29, 48)       # #151d30 Midnight Navy
COLOR_CARD = RGBColor(28, 38, 63)     # #1c263f Navy Card
COLOR_BORDER = RGBColor(44, 58, 89)   # #2c3a59 Subtle Border
COLOR_WHITE = RGBColor(255, 255, 255) # Pure White
COLOR_MUTED = RGBColor(139, 155, 180) # #8b9bb4 Cool Muted Gray
COLOR_BLUE = RGBColor(96, 165, 250)   # #60a5fa Accent Cyan/Blue
COLOR_EMERALD = RGBColor(52, 211, 153)# #34d399 Accent Emerald

def set_slide_background(slide):
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = COLOR_BG

def add_header(slide, title_text, category_text="SMART INDIA HACKATHON 2026 | PS ID: SIH26200"):
    # Category tag
    cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.35))
    tf_c = cat_box.text_frame
    tf_c.word_wrap = True
    p_c = tf_c.paragraphs[0]
    p_c.text = category_text.upper()
    p_c.font.size = Pt(11)
    p_c.font.bold = True
    p_c.font.color.rgb = COLOR_BLUE

    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.6))
    tf = t_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title_text
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE

def create_card(slide, left, top, width, height, title=None, subtitle=None):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = COLOR_CARD
    shape.line.color.rgb = COLOR_BORDER
    shape.line.width = Pt(1)
    
    if title:
        tf = shape.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.25)
        tf.margin_right = Inches(0.25)
        tf.margin_top = Inches(0.2)
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = COLOR_WHITE
        if subtitle:
            p2 = tf.add_paragraph()
            p2.text = subtitle
            p2.font.size = Pt(11)
            p2.font.color.rgb = COLOR_MUTED
    return shape

# ==========================================
# SLIDE 1: TITLE PAGE
# ==========================================
s1 = prs.slides.add_slide(blank_layout)
set_slide_background(s1)

# Badge
badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(4.2), Inches(0.45))
badge.fill.solid()
badge.fill.fore_color.rgb = COLOR_CARD
badge.line.color.rgb = COLOR_BORDER
tf_b = badge.text_frame
p_b = tf_b.paragraphs[0]
p_b.text = "SMART INDIA HACKATHON 2026"
p_b.font.size = Pt(11)
p_b.font.bold = True
p_b.font.color.rgb = COLOR_BLUE
p_b.alignment = PP_ALIGN.CENTER

# Main Title
title_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(8.5), Inches(2.2))
tf = title_box.text_frame
tf.word_wrap = True
p1 = tf.paragraphs[0]
p1.text = "VectorGuard"
p1.font.size = Pt(56)
p1.font.bold = True
p1.font.color.rgb = COLOR_WHITE

p2 = tf.add_paragraph()
p2.text = "AI & Biotech Vector-Borne Disease & Mosquito Control System"
p2.font.size = Pt(20)
p2.font.color.rgb = COLOR_MUTED
p2.space_before = Pt(8)

p3 = tf.add_paragraph()
p3.text = "PREDICT • PREVENT • PROTECT"
p3.font.size = Pt(14)
p3.font.bold = True
p3.font.color.rgb = COLOR_BLUE
p3.space_before = Pt(12)

# Sub-motto
motto_box = s1.shapes.add_textbox(Inches(0.8), Inches(3.9), Inches(7.5), Inches(0.8))
tf_m = motto_box.text_frame
tf_m.word_wrap = True
p_m = tf_m.paragraphs[0]
p_m.text = "“Predict mosquito threats, protect yourself and your loved ones.”"
p_m.font.size = Pt(15)
p_m.font.italic = True
p_m.font.color.rgb = COLOR_WHITE

# Metadata Card on the Right
meta_card = create_card(s1, Inches(8.8), Inches(1.2), Inches(3.8), Inches(5.4))
tf_mc = meta_card.text_frame
tf_mc.word_wrap = True
tf_mc.margin_left = Inches(0.3)
tf_mc.margin_right = Inches(0.3)
tf_mc.margin_top = Inches(0.3)

items = [
    ("PROBLEM STATEMENT ID", "SIH26200"),
    ("THEME", "MedTech / BioTech / HealthTech"),
    ("CATEGORY", "Software Platform"),
    ("TEAM NAME", "VectorGuard"),
    ("PRIMARY STATE", "Telangana State (Scalable Pan-India)"),
    ("LIVE DEPLOYMENT", "https://lasyakerelli-maker.github.io/vectorguard1/")
]

for label, val in items:
    p_l = tf_mc.add_paragraph()
    p_l.text = label
    p_l.font.size = Pt(10)
    p_l.font.bold = True
    p_l.font.color.rgb = COLOR_BLUE
    p_l.space_before = Pt(10)

    p_v = tf_mc.add_paragraph()
    p_v.text = val
    p_v.font.size = Pt(12)
    p_v.font.bold = (label != "LIVE DEPLOYMENT")
    p_v.font.color.rgb = COLOR_WHITE

# Left Bottom Pillars
pillar_card = create_card(s1, Inches(0.8), Inches(4.9), Inches(7.6), Inches(1.7))
tf_p = pillar_card.text_frame
tf_p.word_wrap = True
tf_p.margin_left = Inches(0.3)
tf_p.margin_top = Inches(0.2)
p_pt = tf_p.paragraphs[0]
p_pt.text = "AUTONOMOUS PUBLIC HEALTH INFRASTRUCTURE"
p_pt.font.size = Pt(12)
p_pt.font.bold = True
p_pt.font.color.rgb = COLOR_BLUE

p_pb = tf_p.add_paragraph()
p_pb.text = "Bridging hyper-local atmospheric environmental intelligence (temperature, humidity, precipitation) with spatial hydrology GIS mapping and direct municipal complaint routing."
p_pb.font.size = Pt(11)
p_pb.font.color.rgb = COLOR_MUTED
p_pb.space_before = Pt(4)


# ==========================================
# SLIDE 2: IDEA TITLE & PROBLEM VS SOLUTION
# ==========================================
s2 = prs.slides.add_slide(blank_layout)
set_slide_background(s2)
add_header(s2, "Idea Overview: Autonomous Public Health")

# Card 1: The Critical Problem
c1 = create_card(s2, Inches(0.8), Inches(1.5), Inches(3.6), Inches(5.2), "The Problem", "Why current vector control fails")
tf1 = c1.text_frame
bullet_points1 = [
    ("Reactive Public Health", "Fogging and medical aid only dispatch after hospital beds fill up with severe Dengue/Malaria patients."),
    ("Hidden Microclimates", "Urban heat islands and standing water create hyper-local breeding clusters right outside residents' doors."),
    ("Climatic Compression", "Ambient temperatures (24°-32°C) cut larval incubation from 14 days down to 6 days."),
    ("Bureaucratic Delay", "Citizens struggle to locate ward contacts and report standing water pools.")
]
for head, desc in bullet_points1:
    p_h = tf1.add_paragraph()
    p_h.text = f"• {head}:"
    p_h.font.size = Pt(11)
    p_h.font.bold = True
    p_h.font.color.rgb = COLOR_WHITE
    p_h.space_before = Pt(8)
    p_d = tf1.add_paragraph()
    p_d.text = f"  {desc}"
    p_d.font.size = Pt(10)
    p_d.font.color.rgb = COLOR_MUTED

# Card 2: The VectorGuard Solution
c2 = create_card(s2, Inches(4.8), Inches(1.5), Inches(3.8), Inches(5.2), "The VectorGuard Solution", "Predictive, preventive, and localized")
tf2 = c2.text_frame
bullet_points2 = [
    ("Hyper-Local Risk AI", "Combines device GPS with live Open-Meteo satellite weather to calculate instant 0-100 breeding scores."),
    ("Spatial Hydrology Mapping", "Pinpoints nearby lakes (Hussain Sagar, Durgam Cheruvu) within a 1.5 km vector flight radius."),
    ("Targeted Biotech Guidance", "Prescribes Bacillus thuringiensis israelensis (Bti) microbial larvicide and Gambusia fish stocking."),
    ("Direct Civic Escalation", "One-click reporting to Telangana Municipal Services (municipalservices.in ID: 259).")
]
for head, desc in bullet_points2:
    p_h = tf2.add_paragraph()
    p_h.text = f"• {head}:"
    p_h.font.size = Pt(11)
    p_h.font.bold = True
    p_h.font.color.rgb = COLOR_WHITE
    p_h.space_before = Pt(8)
    p_d = tf2.add_paragraph()
    p_d.text = f"  {desc}"
    p_d.font.size = Pt(10)
    p_d.font.color.rgb = COLOR_MUTED

# Card 3: Embedded Infographic or Proof
c3 = create_card(s2, Inches(8.9), Inches(1.5), Inches(3.7), Inches(5.2), "The Three Offerings", "Core User Experience")
tf3 = c3.text_frame
offerings = [
    ("1. Risk Prediction", "Requests location upfront, tracks temperature/humidity, scores breeding vulnerability (High/Low)."),
    ("2. Raise an Issue", "Direct link and quick complaint submission to municipal authorities for standing water and open sewers."),
    ("3. Preventative Education", "Mortality statistics, Sunday Dry Day protocol, Bti science, and interactive FAQs.")
]
for title, desc in offerings:
    p_t = tf3.add_paragraph()
    p_t.text = title
    p_t.font.size = Pt(12)
    p_t.font.bold = True
    p_t.font.color.rgb = COLOR_BLUE
    p_t.space_before = Pt(14)
    p_de = tf3.add_paragraph()
    p_de.text = desc
    p_de.font.size = Pt(10)
    p_de.font.color.rgb = COLOR_MUTED

# Try adding infographic image if exists
img_path = r"C:\Users\Lasya\.gemini\antigravity\scratch\vectorguard-portal\images\mosquito-prevention-dark.png"
if os.path.exists(img_path):
    try:
        s2.shapes.add_picture(img_path, Inches(9.1), Inches(4.7), width=Inches(3.3))
    except Exception as e:
        print("Image add error:", e)


# ==========================================
# SLIDE 3: TECHNICAL APPROACH (THE TECH STACK)
# ==========================================
s3 = prs.slides.add_slide(blank_layout)
set_slide_background(s3)
add_header(s3, "Technical Architecture: Frontend, Backend & AI Engine")

# Box 1: Frontend (What is it?)
f_card = create_card(s3, Inches(0.8), Inches(1.5), Inches(3.6), Inches(5.2), "Frontend Architecture", "What the User Sees & Interacts With")
tf_f = f_card.text_frame
f_text = [
    ("What is Frontend?", "The visual interface and interactive buttons, maps, and forms running inside the user's browser or smartphone."),
    ("Technologies Used:", "HTML5 Semantic Web, Modern JavaScript (ES Modules), Tailwind CSS framework."),
    ("Why this choice?", "Zero build-step lag, instant loading on 4G/5G mobile networks, completely responsive across all screen sizes."),
    ("Bryan Johnson Design:", "Monochromatic deep navy UI (#151d30) with medical-grade typography (Plus Jakarta Sans) to provide trust and clarity.")
]
for h, d in f_text:
    p = tf_f.add_paragraph()
    p.text = f"• {h}"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE
    p.space_before = Pt(8)
    pd = tf_f.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = COLOR_MUTED

# Box 2: Backend & Atmospheric Telemetry (What is it?)
b_card = create_card(s3, Inches(4.8), Inches(1.5), Inches(3.7), Inches(5.2), "Backend & Data Pipelines", "The Computational Engine Behind the Scenes")
tf_b = b_card.text_frame
b_text = [
    ("What is Backend?", "The data engine, mathematical calculations, API communication, and server logic that powers the website."),
    ("Python Architecture:", "Python 3.14 environment utilizing RESTful handlers, local HTTP server runtime, and automation modules."),
    ("Open-Meteo Satellite API:", "Fetches real-time ambient temperature (2m), relative humidity (%), precipitation (mm) down to 1 km resolution."),
    ("Haversine Distance Engine:", "Calculates great-circle distance between user GPS and Telangana water bodies to identify the nearest vector risk.")
]
for h, d in b_text:
    p = tf_b.add_paragraph()
    p.text = f"• {h}"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE
    p.space_before = Pt(8)
    pd = tf_b.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = COLOR_MUTED

# Box 3: AI & Biotech Risk Scoring Formula
r_card = create_card(s3, Inches(8.8), Inches(1.5), Inches(3.8), Inches(5.2), "AI & Bio-Scoring Model", "Multi-Factor Epidemiological Engine")
tf_r = r_card.text_frame
formula_text = [
    ("1. Temperature Factor (35%)", "Optimal 24°-32°C accelerates larval maturation to 6 days (+35 pts). Extreme cold/heat dampens flight."),
    ("2. Relative Humidity (35%)", "Humidity > 60% increases mosquito lifespan to 45 days (+35 pts), enabling multiple biting cycles."),
    ("3. Surface Precipitation (15%)", "Recent rain (>1mm) pools in ditches and containers, providing millions of oviposition nurseries (+15 pts)."),
    ("4. Hydrological Proximity (15%)", "Located within 1.5 km flight radius of lakes (Hussain Sagar, Durgam Cheruvu) (+15 pts)."),
    ("Output Classification:", "Score ≥ 50 → HIGH RISK (Immediate Bti larvicide)\nScore < 50 → LOW RISK (Routine source clearance)")
]
for h, d in formula_text:
    p = tf_r.add_paragraph()
    p.text = f"• {h}"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_BLUE
    p.space_before = Pt(6)
    pd = tf_r.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = COLOR_WHITE


# ==========================================
# SLIDE 4: FEASIBILITY AND VIABILITY
# ==========================================
s4 = prs.slides.add_slide(blank_layout)
set_slide_background(s4)
add_header(s4, "Feasibility & Viability: Scalable & Zero-Hardware")

c_fea1 = create_card(s4, Inches(0.8), Inches(1.5), Inches(5.6), Inches(2.5), "Technical & Operational Feasibility", "Zero-Hardware Deployment")
tf_fea1 = c_fea1.text_frame
f_bullets = [
    ("Software-Only Infrastructure:", "Requires no expensive sensor towers or specialized field hardware; leverages existing smartphone GPS and global satellite weather APIs."),
    ("Negligible Maintenance Cost:", "Operates on free Open-Meteo satellite telemetry and serverless edge delivery via GitHub Pages."),
    ("Immediate Citizen Accessibility:", "No app download or installation barrier required; works instantly on any smartphone web browser.")
]
for h, d in f_bullets:
    p = tf_fea1.add_paragraph()
    p.text = f"• {h} {d}"
    p.font.size = Pt(10)
    p.font.color.rgb = COLOR_MUTED
    p.space_before = Pt(4)

c_fea2 = create_card(s4, Inches(6.8), Inches(1.5), Inches(5.7), Inches(2.5), "Challenges & Overcoming Strategies", "Built for Real-World Field Conditions")
tf_fea2 = c_fea2.text_frame
ch_bullets = [
    ("Challenge: Low GPS / Signal in Remote Areas:", "Strategy: Built-in manual district & ward selector covering all major Telangana administrative zones."),
    ("Challenge: Outdated Municipal Contact Books:", "Strategy: Integrated direct URL to official centralized portal (municipalservices.in ID 259)."),
    ("Challenge: Offline Usage in Dense Slums:", "Strategy: Cached preventative guides and Sunday Dry Day protocols for offline reference.")
]
for h, d in ch_bullets:
    p = tf_fea2.add_paragraph()
    p.text = f"• {h} {d}"
    p.font.size = Pt(10)
    p.font.color.rgb = COLOR_MUTED
    p.space_before = Pt(4)

c_fea3 = create_card(s4, Inches(0.8), Inches(4.3), Inches(11.7), Inches(2.4), "Scalability Roadmap (Telangana to Pan-India)")
tf_fea3 = c_fea3.text_frame
phases = [
    ("Phase 1: Pilot Deployment (Present)", "Live platform launched covering Greater Hyderabad (GHMC), Warangal, Karimnagar, and Nizamabad with Open-Meteo telemetry."),
    ("Phase 2: Municipal Ward Dashboard (Next 6 Months)", "Equipping ward entomology teams with geo-tagged heatmaps of stagnant water complaints for targeted Bti spraying."),
    ("Phase 3: Drone Fleet & Biotech Integration (2027)", "Direct integration with automated agricultural drone spraying units over inaccessible lake hyacinth canopies.")
]
for h, d in phases:
    p = tf_fea3.add_paragraph()
    p.text = f"• {h}:"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_BLUE
    p.space_before = Pt(5)
    pd = tf_fea3.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = COLOR_WHITE


# ==========================================
# SLIDE 5: IMPACT AND BENEFITS
# ==========================================
s5 = prs.slides.add_slide(blank_layout)
set_slide_background(s5)
add_header(s5, "Impact & Benefits: Autonomous Public Health")

i1 = create_card(s5, Inches(0.8), Inches(1.5), Inches(3.6), Inches(5.2), "Impact on Citizens", "Empowerment & Protection")
tf_i1 = i1.text_frame
cit_impact = [
    ("Early Surge Warning:", "Alerts residents to vector breeding viability 5 to 7 days before mosquitoes reach the adult biting stage."),
    ("Actionable Home Protocols:", "Replaces anxiety with clear steps: Sunday Dry Day checklist, sealing overhead tanks, and using DEET repellents."),
    ("Direct Grievance Voice:", "Enables immediate reporting of unmaintained neighborhood water bodies without bureaucratic runarounds.")
]
for h, d in cit_impact:
    p = tf_i1.add_paragraph()
    p.text = f"• {h}"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE
    p.space_before = Pt(10)
    pd = tf_i1.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = COLOR_MUTED

i2 = create_card(s5, Inches(4.8), Inches(1.5), Inches(3.7), Inches(5.2), "Impact on Municipalities", "Efficiency & Precision Targeting")
tf_i2 = i2.text_frame
mun_impact = [
    ("Data-Driven Operations:", "Helps municipal corporations (GHMC, GWMC) transition from random street fogging to pinpoint larvicide application."),
    ("Biotech-First Protocols:", "Promotes eco-safe Bacillus thuringiensis israelensis (Bti) and Gambusia fish over toxic chemical sprays."),
    ("Faster Response SLA:", "Pre-formatted grievance routing slashes complaint response times from weeks to 24-48 hours.")
]
for h, d in mun_impact:
    p = tf_i2.add_paragraph()
    p.text = f"• {h}"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE
    p.space_before = Pt(10)
    pd = tf_i2.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = COLOR_MUTED

i3 = create_card(s5, Inches(8.8), Inches(1.5), Inches(3.8), Inches(5.2), "Public Health Metrics", "Measurable Societal ROI")
tf_i3 = i3.text_frame
met_impact = [
    ("Mortality Reduction:", "Targeting vectors during the aquatic larval stage is 90% cheaper and more effective than treating hospitalized fever patients."),
    ("Ecosystem Preservation:", "Zero chemical pesticide runoff into freshwater lakes, protecting aquatic biodiversity."),
    ("Vision 2047 Alignment:", "Directly advances India's national health goals for complete vector-borne disease elimination.")
]
for h, d in met_impact:
    p = tf_i3.add_paragraph()
    p.text = f"• {h}"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_BLUE
    p.space_before = Pt(10)
    pd = tf_i3.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = COLOR_WHITE


# ==========================================
# SLIDE 6: RESEARCH, REFERENCES & LIVE DEMO
# ==========================================
s6 = prs.slides.add_slide(blank_layout)
set_slide_background(s6)
add_header(s6, "Research, Standards & Live System Verification")

r1 = create_card(s6, Inches(0.8), Inches(1.5), Inches(5.6), Inches(5.2), "Scientific Guidelines & Standards", "Grounded in Authoritative Research")
tf_r1 = r1.text_frame
std_items = [
    ("National Vector Borne Disease Control Programme (NVBDCP):", "Frameworks for Urban Malaria Scheme (UMS) and Aedes source reduction protocols in Indian urban agglomerations."),
    ("World Health Organization (WHO):", "Specifications for Bacillus thuringiensis israelensis (Bti) microbial larvicides and larvivorous fish predator controls."),
    ("Open-Meteo Meteorological Telemetry:", "Validated satellite & atmospheric models (ECMWF, NOAA, DWD) for hyper-local surface temperature and humidity extraction."),
    ("Telangana Municipal Services Act:", "Direct integration standards with official civic redressal systems (municipalservices.in ID: 259).")
]
for h, d in std_items:
    p = tf_r1.add_paragraph()
    p.text = f"• {h}"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_WHITE
    p.space_before = Pt(10)
    pd = tf_r1.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = COLOR_MUTED

r2 = create_card(s6, Inches(6.8), Inches(1.5), Inches(5.7), Inches(5.2), "Live System Verification", "Fully Functional Platform")
tf_r2 = r2.text_frame
demo_items = [
    ("Live Deployment URL:", "https://lasyakerelli-maker.github.io/vectorguard1/"),
    ("Dedicated Education Page:", "https://lasyakerelli-maker.github.io/vectorguard1/education.html"),
    ("GitHub Source Repository:", "https://github.com/lasyakerelli-maker/vectorguard1"),
    ("Current Status:", "Fully operational and accessible on all iOS/Android smartphones worldwide."),
    ("Core Team Motto:", "“Predict mosquito threats, protect yourself and your loved ones.”")
]
for h, d in demo_items:
    p = tf_r2.add_paragraph()
    p.text = f"• {h}"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = COLOR_BLUE
    p.space_before = Pt(8)
    pd = tf_r2.add_paragraph()
    pd.text = f"  {d}"
    pd.font.size = Pt(10)
    pd.font.color.rgb = COLOR_WHITE

output_path = r"C:\Users\Lasya\.gemini\antigravity\scratch\vectorguard-portal\VectorGuard_SIH2026_PitchDeck.pptx"
prs.save(output_path)
print(f"Presentation saved successfully to: {output_path}")
