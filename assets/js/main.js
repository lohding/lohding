// JavaScript Document

let menuBar = document.getElementById('menubar');
let menuList = document.getElementById('menu');
let pdLogo = document.getElementById('pd-logo');

let circle = document.getElementById('circle')
let dictbox = document.getElementById('dictionarybox')
const circleTracker = (e) => {
	circle.style.display = 'block';
	circle.style.left = e.pageX + 'px';
	circle.style.top = e.pageY + 'px';
	
    // Update target position based on mouse location
    const frameRect = frame.getBoundingClientRect();
    const dictboxRect = dictbox.getBoundingClientRect();

    const distToLeft = e.pageX - frameRect.left;
    const distToRight = frameRect.right - e.pageX;
    const distToTop = dictboxRect.top - frameRect.top;
    const distToBottom = frameRect.bottom - e.pageY;

    targetX = e.pageX;
    targetY = e.pageY;

    // Adjust target position based on boundary conditions
    if (distToLeft < .1*dictboxRect.width + 12) {
        targetX = frameRect.left + .1*dictboxRect.width + 12; 
    } else if (distToRight < dictboxRect.width + 12) {
        targetX = e.pageX + .8*distToRight - dictboxRect.width;
    }

    if (distToTop < 12) {
        targetY = frameRect.top + dictboxRect.height + 12 + 12;
    } else if (distToBottom < dictboxRect.height + 25) {
        // targetY = frameRect.bottom - dictboxRect.height - 12 - 12;
		targetY = e.pageY +.8*distToBottom - dictboxRect.height - 24;
    }

    // Trigger animation if not already running
    if (!animationFrame) {
        animationFrame = requestAnimationFrame(() => animateDictbox());
    }
}

let animationFrame;

const animateDictbox = () => {
    const curX = parseFloat(getComputedStyle(dictbox).left) || 0;
    const curY = parseFloat(getComputedStyle(dictbox).top) || 0;

    const easing = 0.1; // Adjust this value to control the smoothness
    const moveAmountX = (targetX - curX) * easing;
    const moveAmountY = (targetY - curY) * easing;
    
    // Move dictbox
    dictbox.style.left = `${curX + moveAmountX}px`;
    dictbox.style.top = `${curY + moveAmountY}px`;

    // Apply transformations
    dictbox.style.transform = "translate(-10%, 12px)";

    // Check if animation should continue
    const threshold = 1; // Distance threshold to consider the animation complete
    if (Math.abs(targetX - curX) > threshold || Math.abs(targetY - curY) > threshold) {
        animationFrame = requestAnimationFrame(animateDictbox);
    } else {
        animationFrame = null; // Stop the animation loop
    }
}

const wordDict={ 
	"Glib": "(of words or the person speaking them) fluent and voluble but insincere and shallow",
	"Spry": "(especially of an old person) active; lively", 
	"Esoteric": "intended for or likely to be understood by only a small number of people with a specialized knowledge or interest",
	"You forget yourself": "it's almost always a rebuke, rarely a warning",
	"Reckon": "consider or regard in a specified way",
	"You're a martyr for progress": " -  Unknown",
	"Volatile": "liable to change rapidly and unpredictably, especially for the worse",
	"Synecdoche": "a figure of speech in which a part is made to represent the whole or vice versa",
	"Concomitant": "naturally accompanying or associated",
	"Throes of war": "midst of a violent or intense battle",
	"Mum's the word": "used to say that some information is being kept secret or should be kept secret",
	"This town used to mean something": "it's true!",
	"Apocryphal": "(of a story or statement) of doubtful authenticity, although widely circulated as being true",
	"Halitosis": "bad breath",
	"Bon vivant": "a person who enjoys a sociable and luxurious lifestyle",
	"Tchotchkes": "a small object that is decorative rather than strictly functional; a trinket",
	"Fictive kinship": " a form of extended family members who are not related by either blood or marriage",
	"In vogue": "popular and fashionable",
	"Yikes": "expressing shock and alarm",
	"I can see it in my minds eye": " -  Someone with a vision",
	"Yoisho": "Japanese canned phrase usually said before one is about to do something that requires some effort",
	"Agelast": "a person who never laughs",
	"Dossier": "a collection of documents about a particular person, event, or subject",
	"Fudgel": "to pretend to work when in reality one is not doing anything",
	"Officious": "assertive of authority in an annoyingly domineering way, especially with regard to petty or trivial matters",
	"Saturnine": "(of a person or their manner) slow and gloomy",
	"Monomaniacal": "obsessed with a single subject or idea",
	"Rarefied": "distant from the lives and concerns of ordinary people",
	"Quandary": "a state of perplexity or uncertainty over what to do in a difficult situation",
	"Interpolate": "insert (words) in a book or other text, especially in order to give a false impression as to its date",
	"Curiosity delay": "a reference to slowed traffic caused by accidents",
	"Bone of contention":"something that two or more people argue about strongly over a long period of time",
	"Inure":"to accustom to accept something undesirable",
	"Proviso":"A condition in an agreement",
	"Incipient":"(of a person) developing into a specified type or role",
	"Edgeways":"with the edge uppermost or toward the viewer",
	"Nostradamus":"a French astrologer, apothecary, physician, and reputed seer, who is best known for his book Les Prophéties",
	"From that day to this":"used to imply that the issue or idea being discussed has persisted over a long period of time",
	"Rapt":"completely fascinated by what one is seeing or hearing; having been carried away bodily or transported to heaven",
	"Inutility":"uselessness",
	"Fund of knowledge":"one's pre-existing awareness of familiarity of a subject that enables them to learn new information about it",
	"Taste of life's delirium":"a experience that is overly sweet",
	"To serve with no mean repast":" -  Kate Chopin; to be notably generous to a guest",
	"Myopic":"Lacking imagination, foresight, or intellectual insight",
	"Rest on your laurels":"To be satisfied with past syccesses and do nothing to achieve further success",
	"Prudery":"Excessive propriety or modesty in speech, conduct, etc.",
	"Germane":"Relevant to a subject under consideration",
	"Precocity":"exceptionally early development",
	"Recondite reason":"an excuse too obscure for the typical person to understand",
	"Never fall into the jocosely familiar":" -  Billy Budd, Herman Melville",
	"We all have prisons, mostly of our own making":" - Toby Dorr, the person who helped John Manard escape prison",
	"The problems of keeping children alive are not real for children":" - James Baldwin",
	"Mess is a sign of happiness":" - Paolo",
	"Pain now for the happiness then":" - C.S. Lewis",
	"Unhand him":"it's gone too far!",
	"Your faith is overwhelming": " - Brandon",
	"Stare into the middle distance":"me when tired",
	"If you don't get a weird roommate, then you are the weird roommate":" - Harry",
	"Holds a mirror up to society, doesn't it":" - Oliver",
	"High-octane":"powerful or dynamic",
	"Marplot":"one who frustrates or ruins a plan or undertaking by meddling",
	"Molder":"slowly decay or disintegrate, especially because of neglect",
	"Crime of piety":" -  Antigone, Sophocles",
	"Sure-fire no":"eating live squid",
	"Draconian":"(of laws or their application) excessively harsh and severe",
	"Ossified":"having become rigid or fixed in attitude or position",
	"Coals to Newcastle":"used in reference to the supply of something to a place where it is already plentiful",
	"Hoity toity":"haughty or snobbish",
	"Elan": "energy, style, and enthusiasm",
	"Commisersation":"expressions of sympathy and sorrow for another",
	"Status is day to day":"reference of frequent uncertainty in one's life",
	"Good shout":"an expression of excited agreement",
	"Aglet":"a metal or plastic tube fixed tightly around each end of a shoelace",
	"Small fry":"insignificant people or things",
	"Dastardly":"wicked and cruel",
	"Lampoon":"publicly criticize (someone or something) by using ridicule, irony, or sarcasm",
	"Positively adore":"most people towards their pets",
	"Namely":"that is to say; to be specific (used to introduce detailed information or a specific example).",
	"Decadent":"luxuriously self-indulgent",
	"Chauvinistic":"displaying excessive or prejudiced support for one's own cause or group",
	"Brazen":"bold and without shame",
	"By dint of":"by means of",
	"Clandestine":"kept secret or done secretively, especially because illicit",
	"Question-begging":"?",
	"Phraseology":"a mode of expression, especially one characteristic of a particular speaker or writer",
	"Senility":"the physical and mental decline associated with old age; state of being senile",
	"Incontrovertible":"not able to be denied or disputed",
	"Quotidian":"occurring daily",
	"Cow":"cause (someone) to submit to one's wishes by intimidation; mooo",
	"Predicated":"found or base something on",
	"Cast aspersions on":"to criticize or make damaging remarks or judgments about someone or something",
	"Onus":"used to refer to something that is one's duty or responsibility",
	"Refractory":"resistant to treatment or cure; resisting control or authority",
	"Mores":"the essential or characteristic customs and conventions of a community",
	"Asperity":"harsh qualities or conditions",
	"Roving":"constantly moving from one area or place to another",
	"A whole to-do":"most purportedly simple tasks",
	"Syndicate":"a group of individuals or organizations combined to promote some common interest",
	"Wheedling":"using flattery or coaxing in order to persuade someone to do something or give one something",
	"Rectilinear":"moving in or forming a straight line",
	"Incongruously":"in a way that is not in harmony or keeping with the surroundings or other aspects of something",
	"Patsy":"a person who is easily taken advantage of, especially by being cheated or blamed for something",
	"Veritable":"being in fact the thing named and not false, unreal, or imaginary",
	"Breezy":"appearing relaxed, informal, and cheerily brisk",
	"Daft":"silly; foolish; infatuated with",
	"Docent":"a person who acts as a guide, typically on a voluntary basis, in a museum, art gallery, or zoo",
	"Persnickety":"placing too much emphasis on trivial or minor details; fussy",
	"Straw that stirs the drink":"The person who stimulates or inspires a group; the major factor affecting a trend or set of developments",
	"Ebb":"(of an emotion or quality) gradually lessen or reduce",
	"Syrupy":"excessively sentimental",
	"Byline":"a line in a newspaper naming the writer of an article",
	"Auspice":"a divine or prophetic token",
	"Harrowing":"acutely distressing",
	"Highly impressionable":"me",
	"Wayworn":"weary with traveling",
	"Smitten":"be strongly attracted to someone or something",
	"As if they were of his ilk":" -  me experiencing FOMO",
	"Amazing forbearance":"respect x 100",
	"In cahoots":"colluding or conspiring together secretly",
	"Zing":"a shrill humming noise; attack or criticize sharply",
	"Chez":"at the home of (used in imitation of French)",
	"Pithy":"(of language or style) concise and forcefully expressive",
	"Worth one's salt":"good or competent at the job or profession specified",
	"The effort is for naught":"what a shame we failed",
	"Blinkered":"having or showing a limited outlook",
	"Marionette":"a small figure of a person operated from above with strings by a puppeteer",
	"Geosmin":"a natural bicyclic terpene with an earthy odor - American Chemical Society",
	"Reportorial":"of or characteristic of newspaper reporters",
	"Jurisprudence":"the theory or philosophy of law",
	"Cause célèbre":"a controversial issue that attracts a great deal of public attention",
	"Basket case":"a person who is functionally incapacitated from extreme nervousness, emotional distress, mental or physical overwork, etc",
	"Blasé":"unimpressed or indifferent to something because one has experienced or seen it so often before",
	"Vol-Au-Vents": "a small hollow case of puff pastry",
	"Wheedle":"coax or persuade (someone) to say or give something",
	"Paragon":"a perfect diamond of 100 carats or more",
	"Beau idéal":"a conception of perfect beauty. a model of excellence",
	"Blithe":"showing a casual and cheerful indifference considered to be callous or improper",
	"Tryst":"an agreement (as between lovers) to meet; an appointed meeting or meeting place.",
	"Extemporary":"spoken or done without preparation",
	"Mawkishness":"the state or quality of having an excess of tender feelings (as of love, nostalgia, or compassion)",
	"Stopgap solution":"a temporary expedient",
	"Pro tem":"lasting only for the time being",
	"Rube":"a country bumpkin",
	"Frenetic":"fast and energetic in a rather wild and uncontrolled way",
	"Primordial":"existing at or from the beginning of time; (especially of a state or quality) basic and fundamental",
	"Mete out":"to give out or distribute",
	"Bituminous":"of, containing, or of the nature of bitumen",
	"Apotheosis":"the highest point in the development of something; culmination or climax",
	"Mezzanine":"a low story between two others in a building, typically between the ground and first floors",
	"Xeric":"(of an environment or habitat) containing little moisture; very dry",
	"Vista":"a mental view of a succession of remembered or anticipated events",
	"Sleep had forsaken him":"me too often",
	"Waldeinsamkeit":"the feeling of being alone in the woods (German)",
	"Impasse":"a situation in which no progress is possible, especially because of disagreement; a deadlock",
	"Ruction":"a disturbance or quarrel.",
	"A plurality but not a majority":"as avenues are to streets",
	"Faintest inkling":"a very slight knowledge or vague notion",
	"Rime":"frost formed on cold objects by the rapid freezing of water vapor in cloud or fog; how rhyme ought to be spelled",
	"Fleapit":"a dingy, dirty place, especially a run-down movie theater",
	"Doublespeak":"deliberately euphemistic, ambiguous, or obscure language",
	"Retinue":"a group of advisers, assistants, or others accompanying an important person",
	"Rigmarole":"a lengthy and complicated procedure",
	"A look of complicity": "🫢",
	"The Pad Thai was a little uninspired but otherwise quite good": " - Wostling",
	"Your mind is like a blackboard, and time an eraser that sweeps across it when it's full": " - The Night We Became People Again, Jose Luis Gonzalez",
	"Cut from the same cloth":"of the same nature; similar",
	"Closeout":"a sale of goods at reduced prices to get rid of superfluous stock",
	"Stricken by a malady":"someone back in the day",
	"Abet":"encourage or assist someone to commit (a crime)",
	"Toast of the town":"a person who is very popular in (a particular place) or among (a particular group of people)",
	"Hewed out":"cut from blows of a heavy cutting instrument",
	"Salutary":"(especially with reference to something unwelcome or unpleasant) producing good effects; beneficial",
	"Welter":"move in a turbulent fashion",
	"Virulent":"(of a disease or poison) extremely severe or harmful in its effects",
	"Your great wealth deeper founded":" -  Ajax, Sophocles",
	"Serenely":"in a calm, peaceful, and untroubled manner",
	"Wrought iron":"a soft, ductile, fibrous variety that is produced from a semifused mass of relatively pure iron globules partially surrounded by slag - Britannica",
	"Gloriole":"halo drawn around the head of a saint",
	"Melisma":"a group of notes or tones sung on one syllable in plainsong; melodic embellishment",
	"Mercurial":"(of a person) subject to sudden or unpredictable changes of mood or mind",
	"Illustrious":"well known, respected, and admired for past achievements",
	"Auspicious":"conducive to success; favorable",
	"Ibex":"a wild goat with long, thick ridged horns and a beard, found in the mountains of the Alps, Pyrenees, central Asia, and Ethiopia",
	"I appreciate it and I hope the world lasts for you":" -  Byron Peterson, with fluent aphasia",
	"Catenary":"the curve assumed by a cord of uniform density and cross section that is perfectly flexible but not capable of being stretched and that hangs freely from two fixed points",
	"Arboreal":"(chiefly of animals) living in trees.",
	"Nacre":"mother-of-pearl",
	"Cut quite a dash":"to look attractive in the clothes one is wearing",
	"Bucolic":"relating to the pleasant aspects of the countryside and country life",
	"Iconoclast":"a person who attacks cherished beliefs or institutions",
	"Homogeneity":"the quality or state of being all the same or all of the same kind",
	"Pareidolia":"the tendency to perceive a specific, often meaningful image in a random or ambiguous visual pattern",
	"Erstwhile":"former(ly)",
	"Apologia":"a formal written defense of one's opinions or conduct",
	"Of inscrutable ways":"of a person, not readily investigated, interpreted, or understood",
	"More or Less":"to a certain extent",
	"Fixed odds betting":"a form of gambling where individuals place bets on the outcome of an event, such as sports matches or horse races, at predetermined odds",
	"Temerity":"excessive confidence or boldness; audacity",
	"Wherewithal":"the money or other means needed for a particular purpose",
	"Indelible":"not able to be forgotten or removed",
	"Foible":"a minor weakness or eccentricity in someone's character",
	"Incommensurably more important":"sleep > work",
	"Clapped-out":"(of a vehicle, machine, or person) worn out from age or heavy use and unable to work or operate",
	"Rare moment of lucidity":"when public speaking, hopefully",
	"Picaresque":"relating to an episodic style of fiction dealing with the adventures of a rough and dishonest but appealing hero.",
	"Agronomist":"an expert in the science of soil management and crop production",
	"Gaffe":"an unintentional act or remark causing embarrassment to its originator; a blunder",
	"By tacit accord":"by an agreement understood or implied without being stated",
	"Saucebox":"a saucy impudent person",
	"Pernicious":"highly injurious or destructive",
	"Monolithic will":"a determination that is large, powerful, and intractably indivisible and uniform",
	"Pallor":"an unhealthy pale appearance",
	"Accolade":"an award or privilege granted as a special honor or as an acknowledgment of merit",
	"Reverie":"a state of being pleasantly lost in one's thoughts; a daydream",
	"Marquee":"a canopy projecting over the entrance to a theater, hotel, or other building",
	"Hapless":"(especially of a person) unfortunate",
	"Again with the":" -  Someone annoyed",
	"Perogative":"a right or privilege exclusive to a particular individual or class",
	"Countervailing":"offsetting an effect by countering it with something of equal force",
	"Shorn":"past participle of shear",
	"Precluded":"prevented from happening; made impossible",
	"Rank and file":"the ordinary members of an organization as opposed to its leaders",
	"Verdigris":"a bright bluish-green encrustation or patina formed on copper or brass by atmospheric oxidation, consisting of basic copper carbonate",
	"Summarily":"concisely; in a few words",
	"Diffidence":"modesty or shyness resulting from a lack of self-confidence",
	"Discovery of penicillin":" -  Accidentally by Alexander Fleming",
	"Eschew":"deliberately avoid using; abstain from",
	"Florid":"very flowery in style; ornate",
	"Eleventy":"a large but unspecified number or quantity (often used in combination with another large number)",
	"Proof positive":"evidence taken to be final or absolute proof of the existence of something",
	"Détente":"the relaxation of strained relations or tensions (as between nations)",
	"Travesty":"a false, absurd, or distorted representation of something",
	"Cornet":"a brass instrument resembling a trumpet but shorter and wider, played chiefly in bands",
	"Potato":"Yum",
	"Consensus bias":"where people tend to think their own opinions are shared by the majority",
	"Foie gras":"the liver of a specially fattened goose or duck prepared as food",
	"Rife":"in an unchecked or widespread manner",
	"Piecemeal":"characterized by unsystematic partial measures taken over a period of time",
	"Trite":"(of a remark, opinion, or idea) overused and consequently of little import; lacking originality or freshness",
	"On the double":"faster!",
	"Nickel-and-dime":"greedily or unfairly charge (someone) many small amounts for minor services; of little importance; petty.",
	"Pretension":"a claim or assertion of a claim to something",
	"Pot meet kettle":"canned phrase used to draw attention to hypocrisy",
	"Portend":"be a sign or warning that (something, especially something momentous or calamitous) is likely to happen",
	"Presage":"(of an event) be a sign or warning that (something, typically something bad) will happen",
	"Aversion":"a strong dislike or disinclination",
	"A cat amongst the pigeons":"a disturbance caused by an undesirable person from the perspective of a group - Wikipedia",
	"Verdant":"(of countryside) green with grass or other rich vegetation",
	"Bespoke":"made for a particular customer or user",
	"Boon":"a thing that is helpful or beneficial",
	"Exorbitant":"(of a price or amount charged) unreasonably high",
	"Penchant":"a strong or habitual liking for something or tendency to do something",
	"Lackluster":"lacking in vitality, force, or conviction; uninspired or uninspiring.",
	"Prosaic":"commonplace; unromantic",
	"Mettle":"a person's ability to cope well with difficulties or to face a demanding situation in a spirited and resilient way",
	"Banality":"the fact or condition of being banal; unoriginality",
	"Jabroni":"a foolish or contemptible person",
	"Vapid":"without liveliness or spirit; dull or tedious",
	"Debonair":"confident, stylish, and charming (typically used of a man)",
	"Conciliatory":"intended or likely to placate or pacify",
	"Nebulous":"(of a concept or idea) unclear vague or ill-defined",
	"Prefigure":"be an early indication or version of (something)",
	"Goad":"provoke or annoy (someone) so as to stimulate some action or reaction",
	"Au Courant":"aware of what is going on; well informed; fashionable",
	"Above the fray":"not directly involved in an angry or difficult struggle or disagreement",
	"Terse":"sparing in the use of words; abrupt",
	"Brusque":"abrupt or offhand in speech or manner",
	"Grotto":"a small picturesque cave, especially an artificial one in a park or garden",
	"Tableau":"a group of models or motionless figures representing a scene from a story or from history; a tableau vivant",
	"Well-heeled":"wealthy",
	"Headlong":"without deliberation; recklessly rushes",
	"Ply":"direct (numerous questions) at someone",
	"Blindsided":"catch (someone) unprepared; attack from an unexpected position",
	"Jalousie":"a blind or shutter made of a row of angled slats",
	"Raving":"wild, irrational, or incoherent talk",
	"Tepid":"showing little enthusiasm",
	"Functionary":"a person who has to perform official functions or duties; an official",
	"Candelabra":"a branched candlestick or lamp with several lights",
	"Zero-sum game":"relating to or denoting a situation in which whatever is gained by one side is lost by the other",
	"Cursory":"hasty and therefore not thorough or detailed",
	"Nascent":"(especially of a process or organization) just coming into existence and beginning to display signs of future potential",
	"Chimera":"a thing that is hoped or wished for but in fact is illusory or impossible to achieve",
	"Stringent":"(of regulations, requirements, or conditions) strict, precise, and exacting",
	"Will-o-the-wisp":"a flame-like phosphorescence caused by gases from decaying plants in marshy areas",
	"Plaudit":"an expression of praise or approval",
	"Expunge":"erase or remove completely (something unwanted or unpleasant)",
	"Charlatan":"a person falsely claiming to have a special knowledge or skill; a fraud",
	"Gilt-edged":"of very high quality",
	"Cavalier":"showing a lack of proper concern; offhand",
	"Farce":"an absurd event",
	"Moreish":"causing a desire for more; palatable",
	"Cloying":"excessively sweet, rich, or sentimental, especially to a disgusting or sickening degree",
	"Stentorian":"(of a person's voice) loud and powerful",
	"Violates the spirit, if not the letter":"unsportsmanlike conduct",
	"Wend":"go in a specified direction, typically slowly or by an indirect route",
	"Motley":"incongruously varied in appearance or character; disparate",
	"Tagliatelle":"my favorite pasta. yumm",
	"Leaf sheep":"Costasiella kuroshimae",
	"Luminism":"1850-1870s American art style of peaceful, soft landscapes featuring the likes of Sanford Gifford and Fitz Henry Lane",
	"Have gun, will travel":"American colloquialism for willingness to do whatever, referencing Americans putting themselves out for jobs in the West",
	"Cottage industry":"manufacturing activity carried out by individuals working at home",
	"Such is life in the big city":"C'est la vie!",
	"Artifice": "an artful stratagem",
	"Chandler": "a maker or seller of tallow or wax candles and usually soap",
	"Better a dinner of herbs": "Than a stalled ox and hatred therewith",
	"Expedient": "suitable for achieving a particular end in a given circumstance",
	"Fussillade": "A discharge from a number of firearms, fired simultaneously or in rapid succession.",
	"Effusive": "marked by the expression of great or excessive emotion or enthusiasm",
	"Peckish": "I want snacks.",
	"Acme of bliss": "- Kate Chopin; highest point of joy",
	"Effulgence": "radiant splendor",
	"Listless": "characterized by lack of interest, energy, or spirit",
	"Panacea": "a remedy for all ills or difficulties",
	"Conniving": "to cooperate secretly or have a secret understanding",
	"Vicissitude": "a difficulty or hardship attendant on a way of life, a career, or a course of action and usually beyond one's control",
	"Flotsam" : "floating wreckage of a ship or its cargo",
	"Hegemony": "the social, cultural, ideological, or economic influence exerted by a dominant group",
	"Peremptory": "Subject to no further debate or dispute",
	"Bifurcate ": "to divide into two branches or parts",
	"Circumspect": "careful to consider all circumstances and possible consequences",
	"In abeyance": "in a state of temporary inactivity",
	"Abrogate": "to treat as nonexistent",
	"Irascible": "marked by hot temper and easily provoked anger",
	"Tête-a-tête": "in private",
	"Nothing beats kindness. It sits quietly beyond all things": "- Charlie Mackesy",
	"Acorn weevil": "Curculio glandium; what a snout!",
	"Slope": "a deviation from the horizontal",
	"Roxbury russet": "likely the oldest apple cultivar from North America",
	"Camille Pissarro": "the Father of impressionism",
	"The cobra effect": "when an attempted solution makes things worse",
	"Turned the corner": "begun to improve noticeably after difficulty",
	"Churlish": "difficult to work with, such as soil; intractable",
	"Penrose tiling": "A pair of shapes that can cover the entire plane without gaps, overalls, or translational symmetry",
	"Bite the bullet": "to accept and endure an inevitable hardship",
	"Actuarial standpoint": "looking at it all mathy and such",
	"Vantage loaf": "the thirteenth loaf in a baker's dozen",
	"Pastiche": "a work that imitates the style of previous work",
	"Pigeonhole": "to assign to an often restrictive category",
	"Rebuff": "to reject or criticize sharply",
	"Wayward": "following no clear principle or law; opposite to what is desired or expected",
	"Fracas": "a noisy quarrel",
	"Acrid": "sharp and harsh or unpleasantly pungent in taste or odor",
	"Cop a plea": "admit to guilt for a lighter sentence",
	"Bastion": "One that upholds or defends something, as against neglect or unpopularity",
	"Angel Wing Syndrome": "A sad goose",
	"Iodized salt": "🧂",
	"Gödel's Incompleteness Theorem": "The first incompleteness theorem states that in any consistent formal system F within which a certain amount of arithmetic can be carried out, there are statements of the language of F which can neither be proved nor disproved in F.<br><br>According to the second incompleteness theorem, such a formal system cannot prove that the system itself is consistent (assuming it is indeed consistent).<br><br>- Stanford Encyclopedia of Philosophy"

};

const wordArray = Object.keys(wordDict);

window.onload = function () {
	shuffleArray(wordArray);
	circle.style.left = '60%';
	circle.style.top = '110%';
	dictbox.style.left = '60%';
	dictbox.style.top = '110%';
	resizeFrame;
	fillCloud(wordArray, false ,"");
	frame.style.height = 'calc(100vh - 99px + 1px)';
	frame.style.margin = '8px 16px 0px 16px';
	frame.style.transform = 'translateY(0px)';
	frame.style.fontSize = '100%';
	setTimeout(() => {
		menuBar.style.transform = 'translateY(0px)';
	}, 300);
}

function resizeFrame() {
    if (frame.classList.contains('alt')) {
        // Set the height when the 'alt' class is present
        frame.style.height = '142px'; // Replace with your desired height for 'alt'
    } else if (window.innerHeight < 190) {
        // When window height is less than 190 and 'alt' class is not present
        frame.style.height = '64px';
    } else {
        // When window height is 190 or more and 'alt' class is not present
        frame.style.height = 'calc(100vh - 103px + 1px)';
    }
}

window.addEventListener('resize', resizeFrame);

let wordCloud = document.getElementById("wordcloud")

function fillCloud(element, phrase, fullphrase) {
	let first = 0
		for (let i = 0; i < element.length; ++i) {
			let h6 = document.createElement('h6');
			if (phrase == true) {
				h6.className = "phrasecloudet";
				h6.setAttribute('dict-entry', fullphrase);
				if (first == 0) {
					h6.classList.add("firstofphrase")
					first = 1
				}
			} else {
				h6.className = "wordcloudet"
			}
			var words = element[i].split(" ");
			if (words.length > 1) {
				fillCloud(words, true, element[i])
			} else {	
				h6.innerText = element[i]
				if (!isOverflowing(wordCloud)) {
					wordCloud.appendChild(h6);
			}
			}

		}
}

function isOverflowing(element) {
	return element.children.offsetTop + element.children.offsetHeight >
      element.offsetTop + element.offsetHeight;
}

for (var i = 0; i < wordCloud.children.length; i++) {
	if (isOverflowing(wordCloud)) {
		wordCloud.children[i].style.display = 'none';
	}
}

function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let dictframe = document.getElementById('dictionaryframe')
// Function to handle mouse over
function cloudetHandleMouseOver(event) {
    // Check if the event target has the class 'wordcloudet'
    if (event.target.classList.contains('wordcloudet')) {
        event.target.style.color = 'black'; // Ensure text is visible
		dictframe.innerHTML = wordDict[event.target.innerHTML]
    } else if (event.target.classList.contains('phrasecloudet')) {
        // Handle next siblings
        let curword = event.target;
        curword.style.color = 'black'; 
        
        while (curword.nextSibling && curword.nextSibling.nodeType === 1 && curword.nextSibling.classList.contains('phrasecloudet') && !curword.nextSibling.classList.contains('firstofphrase')) {
            curword = curword.nextSibling;
            curword.style.color = 'black';
        }

        // Handle previous siblings
        curword = event.target;
        while (curword.previousSibling && curword.previousSibling.nodeType === 1 && curword.previousSibling.classList.contains('phrasecloudet') && !curword.classList.contains('firstofphrase')){
            curword = curword.previousSibling;
            curword.style.color = 'black';
        }
		dictframe.innerHTML = wordDict[event.target.getAttribute('dict-entry')]
    }
}

// Function to handle mouse out
function cloudetHandleMouseOut(event) {
    // Check if the event target has the class 'wordcloudet'
    if (event.target.classList.contains('wordcloudet')) {
        event.target.style.color = '#D6D3C8'; // Ensure text is visible
    } else if (event.target.classList.contains('phrasecloudet')) {
        // Handle next siblings
        let curword = event.target;
        curword.style.color = '#D6D3C8'; 
        
        while (curword.nextSibling && curword.nextSibling.nodeType === 1 && curword.nextSibling.classList.contains('phrasecloudet')) {
            curword = curword.nextSibling;
            curword.style.color = '#D6D3C8';
        }

        // Handle previous siblings
        curword = event.target;
        while (curword.previousSibling && curword.previousSibling.nodeType === 1 && curword.previousSibling.classList.contains('phrasecloudet')) {
            curword = curword.previousSibling;
            curword.style.color = '#D6D3C8';
        }
    }
}

// Attach event listeners to the flex container or body
const frame = document.querySelector('.frame');
frame.addEventListener('mouseover', cloudetHandleMouseOver);
frame.addEventListener('mouseout', cloudetHandleMouseOut);
frame.addEventListener('mousemove', circleTracker);

// Define the function to handle mouseover events
var backCol = 'black'

// Select all elements with the class 'menuitem'
const menuItems = document.querySelectorAll('.menuitem');

// Add the event listener to each menu item
menuItems.forEach(item => {
	item.addEventListener('click', menuitemHandleMouseClick);
});

function shuffleWords() {
	shuffleArray(wordArray);
	let wordCloud = document.getElementById("wordcloud")
	wordCloud.innerHTML = '';
	fillCloud(wordArray, false ,"")
	dictframe.innerHTML = 'lohded!'
}

pdLogo.addEventListener('click', shuffleWords);
pdLogo.addEventListener('mouseover', function() {
	dictframe.innerHTML = 'lohding...'
});

const menuIcon = document.getElementById("menuicon");
const pageBody = document.getElementById("pagebody");
const footerRight = document.getElementById("footerright");
const footerDef = document.getElementById("footerdef");

let pageFrame;
let templatePage = document.getElementById('templatepage');
let aboutPage = document.getElementById('aboutpage');
let contactPage = document.getElementById('contactpage');
let writtenLogo = document.getElementById('written-logo');
let targetScroll = 0;

const dots = ['', ' .', ' . .', ' . . .'];
const loadingDefs = [
	"/ˈlōdiNG/ [Merriam Webster]<br>1a. putting a load in or on (a vehicle, animal, etc.)",
	"/ˈlōdiNG/ [Merriam Webster]<br>1b. placing (someone or something) in or on a means of conveyance",
	"/ˈlōdiNG/ [Merriam Webster]<br>2a. encumbering or oppressing (someone or something) with something heavy, laborious, or disheartening",
	"/ˈlōdiNG/ [Merriam Webster]<br>2b. placing (something) as a burden or obligation",
	"/ˈlōdiNG/ [Merriam Webster]<br>3a1. placing or being a material weight or physical stres on (something)",
	"/ˈlōdiNG/ [Merriam Webster]<br>3a2. increasing the weight of (something) by adding something heavy",
	"/ˈlōdiNG/ [Merriam Webster]<br>3b. (techincal): adding a substance (such as a mineral salt) to (something) to improve a property (such as texture or fullness)",
	"/ˈlōdiNG/ [Merriam Webster]<br>3c. weighting or shaping (dice) to fall unfairly",
	"/ˈlōdiNG/ [Merriam Webster]<br>3d. filling (something) with one-sided or prejudicial influences",
	"/ˈlōdiNG/ [Merriam Webster]<br>3e. charging (words, questions, etc.) with multiple meanings (such as emotional associations or hidden implications)",
	"/ˈlōdiNG/ [Merriam Webster]<br>3f. weighting (something, such as a test or survey) with factors influencing validity or outcome",
	"/ˈlōdiNG/ [Merriam Webster]<br>4a. supplying (someone or something) in abundance or excess",
	"/ˈlōdiNG/ [Merriam Webster]<br>4b. putting runners on (first, second, and third bases) in baseball",
	"/ˈlōdiNG/ [Merriam Webster]<br>5a. putting a load or charge in (a device or piece of equipment)",
	"/ˈlōdiNG/ [Merriam Webster]<br>5b. placing or inserting (something) especially as a load in a device or piece of equipment",
	"/ˈlōdiNG/ [Merriam Webster]<br>5c. causing (a program, data, etc.) to be copied or transfered into memory for use or display on a digital device",
	"/ˈlōdiNG/ [Merriam Webster]<br>5d. putting a supply of funds or resources into (an account, a gift card, etc.)",
	"/ˈlōdiNG/ [Merriam Webster]<br>6a. adding a load to (an insurance premium)",
	"/ˈlōdiNG/ [Merriam Webster]<br>6b. adding a sum to (something, such as a selling price) after profits and expenses are accounted for",
	"/ˈlōdiNG/ [Merriam Webster]<br>7. becoming copied or transfered into memory for use or display on a digital device"
];

let menuOpen = true;
let curMenuItem;
let curMenuItemName;
function menuitemHandleMouseClick(e) {

	if (e.target.id == 'lohmentos') {
		return;
	};

	menuOpen = false;

	const menuListRect = menuList.getBoundingClientRect();
    const itemRect = this.getBoundingClientRect();
    
    // Calculate the amount needed to translate
    const translateX = menuListRect.right - itemRect.right;

	// Show menu icon
	menuIcon.classList.add('show')

    // Apply translation to the wrapper
    e.target.style.transform = `translateX(${translateX}px)`;
	e.target.addEventListener('click', menuiconHandleMouseClick);

	curMenuItem = e.target
	if (curMenuItem.innerHTML == 'OPEN MENU') {
		curMenuItem.innerHTML = curMenuItemName;
	}
	curMenuItemName = curMenuItem.innerHTML;

	frame.classList.add('alt')
	//menuList.classList.add('small')
	menuItems.forEach(item => {
		if (item != e.target) {
			item.classList.add('hidden');
		}
	});
	
	const wordItems = document.querySelectorAll('.wordcloudet, .phrasecloudet');
	wordItems.forEach((item, index) => {
		if (item.classList.contains('phrasecloudet')) {
			item.classList.remove('phrasecloudet')
			item.classList.add('wordcloudet')
		}
		// Apply the fade-out class to trigger the CSS transition
		item.classList.add('faded');
	});

	cancelAnimationFrame(animationFrame);
	const dictTransformY = window.innerHeight + 10000;
	dictbox.style.transform = `translateY(${dictTransformY}px)`;
	dictbox.style.display = 'none';
	circle.style.display = 'none';
	
	frame.removeEventListener('mouseover', circleTracker);
	frame.style.pointerEvents = 'none';
	pdLogo.removeEventListener('click', shuffleWords);
	pdLogo.addEventListener('click', () => {
		window.location.reload();
		pdLogo.addEventListener('click', shuffleWords);
	});

	if (e.target.id == 'templates') {		
		pageFrame = templatePage;
		pageFrame.classList.add('tallpage');
	} else if (e.target.id == 'about') {
		pageFrame = aboutPage;
		pageFrame.classList.add('perfectpage');
	} else if (e.target.id == 'contact') {
		pageFrame = contactPage;
		pageFrame.classList.add('contactpage');
	}

	pageFrame.classList.add('page');
	pageBody.style.overflowY = 'scroll';
	
	setTimeout(() => {
		frame.style.height = 'fit-content';
		frame.style.margin = '0px 16px 16px';
		frame.style.removeProperty('border');

		wordCloud.style.display = 'none';
		footerRight.style.display = 'flex';
		const loadingDef = loadingDefs[Math.floor(Math.random() * loadingDefs.length)];
		footerDef.innerHTML = loadingDef;
		writtenLogo.classList.add('footerize');

		// Create lohding footer animations
		writtenLogo.addEventListener('mouseenter', function(e) {
			e.target.innerHTML = 'LOADING'
		});
		writtenLogo.addEventListener('mouseleave', function(e) {
			e.target.innerHTML = 'LOHDING'
		});
		writtenLogo.addEventListener("click", () => {
			window.scrollTo({top: 0, behavior: "smooth"});
		});

		//replace old code pageFrame.style.height = 'fit-content';
		const maxHeight = window.innerHeight - 81 + 1;

		// Measure natural height without changing layout
		const naturalHeight = pageFrame.scrollHeight;

		// Set the final target height directly (no toggling, no extra transitions)
		const targetHeight = Math.max(naturalHeight, maxHeight);
		pageFrame.style.height = targetHeight + 'px';

		menuBar.after(pageFrame);
		document.querySelectorAll('.page').forEach(p => {
			if (p != pageFrame) {
				p.className = "prepage";
				p.style.height = "0px";
			}
		});
	}, 600)
}

function menuiconHandleMouseClick(e) {
   
	menuOpen = true

	// Show menu icon
	menuIcon.classList.remove('show')

    // Apply translation to the wrapper
	frame.classList.remove('alt')
	menuList.classList.remove('small')
	menuItems.forEach(item => {
		if (item.classList.contains('hidden')){
			setTimeout(() => {
				item.classList.remove('hidden');
			}, 300)
			
		} else if (!item.classList.contains('menuicon')) {
			item.style.transform = `translateX(0px)`;
			item.removeEventListener('click', menuiconHandleMouseClick)
		}
	});
		
	pdLogo.addEventListener('click', shuffleWords);

}

menuIcon.addEventListener('click', menuiconHandleMouseClick);
menuBar.addEventListener('click', function(e) {
	if (e.target === e.currentTarget) {
		curMenuItem.innerHTML = curMenuItemName;
    	menuiconHandleMouseClick(e);
  	}
});

menuList.addEventListener('click', function(e) {
	if (e.target === e.currentTarget) {
		curMenuItem.innerHTML = curMenuItemName;
    	menuiconHandleMouseClick(e);
  	}
});

menuList.addEventListener('mouseenter', function(e) {
	if (!menuOpen) {
		curMenuItem.innerHTML = 'OPEN MENU'
	}
});
menuList.addEventListener('mouseleave', function(e) {
	if (!menuOpen) {
		curMenuItem.innerHTML = curMenuItemName;
	}
});

/* removed carousel functionality for simplicity */
const carouSel = document.getElementById('template-carousel')
const carouselCont = document.querySelector('.carousel-container');

const bubble = document.querySelector('.bubble');
let targetbubbleX = 0;
let targetbubbleY = 0;
let animationBubbleFrame;
let currentParent = null; // Keep track of the current parent

const bubbleTracker = (e) => {
    const curBlock = e.target; // The new parent element

    // Update parent only if it's different
	if (curBlock.classList.contains("carousel-item")) {
		if (curBlock !== currentParent) {
			// Append bubble to the new parent
			curBlock.insertBefore(bubble, curBlock.firstChild);

			// Recalculate position relative to new parent
			const rectBlock = curBlock.getBoundingClientRect();
			targetbubbleX = e.clientX - rectBlock.left;
			targetbubbleY = e.clientY - rectBlock.top;
			
			const curX = parseFloat(getComputedStyle(bubble).left) - 7.5 || 0;
			const curY = parseFloat(getComputedStyle(bubble).top) - 7.5|| 0;
			
			// Reset bubble position
			bubble.style.left = `${rectBlock.width - curX}px`;
			bubble.style.top = `${rectBlock.height - curY}px`;

			// Update the current parent
			currentParent = curBlock;
		} else {
			// Recalculate target position within the same parent
			const rectBlock = curBlock.getBoundingClientRect();
			targetbubbleX = e.clientX - rectBlock.left;
			targetbubbleY = e.clientY - rectBlock.top;
		}
		
		// Trigger animation if not already running
		if (!animationBubbleFrame) {
			animationBubbleFrame = requestAnimationFrame(animateBubble);
		};
	};
};

const animateBubble = () => {
    const curX = parseFloat(getComputedStyle(bubble).left) - 7.5 || 0;
    const curY = parseFloat(getComputedStyle(bubble).top) - 7.5|| 0;

    const easing = 0.1; // Adjust this value to control the smoothness
    const moveAmountX = (targetbubbleX - curX) * easing;
    const moveAmountY = (targetbubbleY - curY) * easing;
    
    // Move bubble
    bubble.style.left = `${curX + moveAmountX}px`;
    bubble.style.top = `${curY + moveAmountY}px`;

    // Check if animation should continue
    const threshold = 1; // Distance threshold to consider the animation complete
    if (Math.abs(targetbubbleX - curX) > threshold || Math.abs(targetbubbleY - curY) > threshold) {
        animationBubbleFrame = requestAnimationFrame(animateBubble);
    } else {
        animationBubbleFrame = null; // Stop the animation loop
    }
}

carouSel.addEventListener('mousemove', bubbleTracker);

let rectBlock;
const ball = document.querySelector('.ball');
let targetballX = 0;
let targetballY = 0;
let animationBallFrame;

let mouseOnMenu = false
const ballTracker = (e) => {
	ball.style.display = 'flex'
    const curBlock = e.target;
    if (curBlock !== currentParent) {
        curBlock.appendChild(ball);
        rectBlock = curBlock.getBoundingClientRect();

        targetballX = e.clientX - rectBlock.left + 25;
        targetballY = e.clientY - rectBlock.top + 25;

        ball.style.left = `${targetballX}px`;
        ball.style.top = `${targetballY}px`;

        currentParent = curBlock;
    } else {
        const rectBlock = curBlock.getBoundingClientRect();
        targetballX = e.clientX - rectBlock.left + 25;
        targetballY = e.clientY - rectBlock.top + 25;
    }
	
	const blockWidth = rectBlock.width
	if (targetballX < 0.4 * blockWidth) {
		ball.classList.remove('star')
		ball.classList.add('flower')
		ball.style.backgroundColor = "lightseagreen"
	} else if (targetballX < 0.7 * blockWidth) {
		ball.classList.remove('flower')
		ball.classList.add('star')
		ball.style.backgroundColor = "orangered"
	} else {
		ball.classList.remove('star')
		ball.classList.remove('flower')
		ball.style.backgroundColor = "cornflowerblue"
	}

    if (!animationBallFrame) {
        animationBallFrame = requestAnimationFrame(animateball);
    }
};

const animateball = () => {
    const curX = parseFloat(getComputedStyle(ball).left) - 5 || 0;
    const curY = parseFloat(getComputedStyle(ball).top) - 5 || 0;

    const easing = 0.06;
    const moveAmountX = (targetballX - curX) * easing;
    const moveAmountY = (targetballY - curY) * easing;

    ball.style.left = `${curX + moveAmountX}px`;
    ball.style.top = `${curY + moveAmountY}px`;

    const threshold = 1;
    if (Math.abs(targetballX - curX) > threshold || Math.abs(targetballY - curY) > threshold) {
        animationballFrame = requestAnimationFrame(animateball);
    } else {
        animationballFrame = null;
    }
};

aboutPage.addEventListener('mousemove', ballTracker);

const removeBall = () => {
	ball.style.display = 'none'
}

menuBar.addEventListener('mouseenter', removeBall);
//aboutPage.addEventListener('mouseleave', removeBall);

// Jump to specific places
function jumpTo(id, offset = 30) {
    const e = document.getElementById(id).getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.scrollTo({
        top: e.top + scrollTop - offset,
        behavior: "smooth"
    });
}

document.getElementById("jbox").addEventListener("click", () => jumpTo("jtemp"));
document.getElementById("wofbox").addEventListener("click", () => jumpTo("woftemp"));
document.getElementById("ocbox").addEventListener("click", () => jumpTo("octemp"));

document.querySelectorAll(".totop").forEach(e => {
	e.addEventListener("click", () => {
		window.scrollTo({top: 0, behavior: "smooth"});
	});
});

let currDef;
footerRight.addEventListener('mouseover', function() {
	currDef = footerDef.innerHTML
	footerDef.innerHTML = '<br>click for new definition!';
});

footerRight.addEventListener('mouseout', function() {
	footerDef.innerHTML = currDef; 
});

footerRight.addEventListener('click', function() {
	const loadingDef = loadingDefs[Math.floor(Math.random() * loadingDefs.length)];
	footerDef.innerHTML = loadingDef;
	currDef = loadingDef;
});

let menuTemplates = document.getElementById('templates');
let menuLohmentos = document.getElementById('lohmentos');
let menuAbout = document.getElementById('about');
let menuContact = document.getElementById('contact');

menuTemplates.addEventListener('mouseenter', function() {
	dictframe.innerHTML = 'PowerPoints with macros!'
})

menuLohmentos.addEventListener('mouseenter', function() {
	dictframe.innerHTML = 'a collection of image-scanned items from daily life!'
})

menuAbout.addEventListener('mouseenter', function() {
	dictframe.innerHTML = 'learn more about me!'
})

menuContact.addEventListener('mouseenter', function() {
	dictframe.innerHTML = 'reach out and say hi!'
})

