const MathGraph = () => {
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [hoveredNode, setHoveredNode] = React.useState(null);
  const [showAllEdges, setShowAllEdges] = React.useState(false);
  const [showInfluence, setShowInfluence] = React.useState(false);
  
  const nodes = {
    // Foundations
    'Logic': { x: 100, y: 50, color: '#64748b', category: 'Foundations' },
    'Set Theory': { x: 240, y: 40, color: '#64748b', category: 'Foundations' },
    'Category Theory': { x: 400, y: 50, color: '#64748b', category: 'Foundations' },
    'Type Theory': { x: 540, y: 40, color: '#64748b', category: 'Foundations' },
    'Model Theory': { x: 160, y: 100, color: '#64748b', category: 'Foundations' },
    'Computability': { x: 60, y: 120, color: '#64748b', category: 'Foundations' },
    
    // Core Algebra (condensed)
    'Groups': { x: 300, y: 140, color: '#3b82f6', category: 'Algebra' },
    'Rings': { x: 240, y: 210, color: '#3b82f6', category: 'Algebra' },
    'Fields': { x: 170, y: 280, color: '#3b82f6', category: 'Algebra' },
    'Vector Spaces': { x: 280, y: 320, color: '#3b82f6', category: 'Algebra' },
    'Algebras': { x: 400, y: 280, color: '#3b82f6', category: 'Algebra' },
    'Linear Algebra': { x: 240, y: 400, color: '#2563eb', category: 'Algebra' },
    'Group Theory': { x: 380, y: 160, color: '#3b82f6', category: 'Algebra' },
    'Commutative Algebra': { x: 120, y: 370, color: '#3b82f6', category: 'Algebra' },
    'Homological Algebra': { x: 180, y: 460, color: '#3b82f6', category: 'Algebra' },
    'Representation Theory': { x: 480, y: 220, color: '#3b82f6', category: 'Algebra' },
    'Lie Theory': { x: 540, y: 150, color: '#3b82f6', category: 'Algebra' },
    'Clifford Algebras / GA': { x: 500, y: 310, color: '#3b82f6', category: 'Algebra' },
    'Multilinear Algebra': { x: 360, y: 380, color: '#3b82f6', category: 'Algebra' },
    
    // Analysis
    'Real Analysis': { x: 680, y: 100, color: '#10b981', category: 'Analysis' },
    'Complex Analysis': { x: 780, y: 140, color: '#10b981', category: 'Analysis' },
    'Measure Theory': { x: 700, y: 200, color: '#10b981', category: 'Analysis' },
    'Functional Analysis': { x: 580, y: 400, color: '#10b981', category: 'Analysis' },
    'Harmonic Analysis': { x: 680, y: 300, color: '#10b981', category: 'Analysis' },
    'ODEs': { x: 850, y: 220, color: '#10b981', category: 'Analysis' },
    'PDEs': { x: 760, y: 380, color: '#10b981', category: 'Analysis' },
    'Calculus of Variations': { x: 870, y: 310, color: '#10b981', category: 'Analysis' },
    'Operator Algebras': { x: 600, y: 480, color: '#10b981', category: 'Analysis' },
    'Nonlinear Analysis': { x: 850, y: 400, color: '#10b981', category: 'Analysis' },
    'Approximation Theory': { x: 780, y: 60, color: '#10b981', category: 'Analysis' },
    
    // Geometry & Topology
    'Topology': { x: 500, y: 100, color: '#a855f7', category: 'Geometry' },
    'Metric Spaces': { x: 600, y: 160, color: '#a855f7', category: 'Geometry' },
    'Differential Geometry': { x: 620, y: 540, color: '#a855f7', category: 'Geometry' },
    'Riemannian Geometry': { x: 540, y: 620, color: '#a855f7', category: 'Geometry' },
    'Symplectic Geometry': { x: 420, y: 580, color: '#a855f7', category: 'Geometry' },
    'Algebraic Topology': { x: 320, y: 540, color: '#a855f7', category: 'Geometry' },
    'Algebraic Geometry': { x: 180, y: 560, color: '#a855f7', category: 'Geometry' },
    'Projective Geometry': { x: 460, y: 450, color: '#a855f7', category: 'Geometry' },
    'Convex Geometry': { x: 920, y: 480, color: '#a855f7', category: 'Geometry' },
    'Knot Theory': { x: 280, y: 620, color: '#a855f7', category: 'Geometry' },
    'Discrete Geometry': { x: 1000, y: 200, color: '#a855f7', category: 'Geometry' },
    
    // Number Theory
    'Number Theory': { x: 60, y: 460, color: '#f59e0b', category: 'Number Theory' },
    'Algebraic NT': { x: 80, y: 540, color: '#f59e0b', category: 'Number Theory' },
    'Analytic NT': { x: 60, y: 620, color: '#f59e0b', category: 'Number Theory' },
    'Arithmetic Geometry': { x: 140, y: 620, color: '#f59e0b', category: 'Number Theory' },
    
    // Combinatorics & Discrete (NEW)
    'Combinatorics': { x: 950, y: 100, color: '#ec4899', category: 'Combinatorics' },
    'Graph Theory': { x: 1020, y: 140, color: '#ec4899', category: 'Combinatorics' },
    'Coding Theory': { x: 1000, y: 260, color: '#ec4899', category: 'Combinatorics' },
    'Boolean Functions': { x: 920, y: 170, color: '#ec4899', category: 'Combinatorics' },
    'Matroid Theory': { x: 1020, y: 60, color: '#ec4899', category: 'Combinatorics' },
    
    // Probability & Stochastics (expanded)
    'Probability': { x: 800, y: 480, color: '#06b6d4', category: 'Probability' },
    'Stochastic Processes': { x: 880, y: 540, color: '#06b6d4', category: 'Probability' },
    'Statistics': { x: 920, y: 400, color: '#06b6d4', category: 'Probability' },
    'Markov Chains': { x: 960, y: 480, color: '#06b6d4', category: 'Probability' },
    'Monte Carlo': { x: 1000, y: 540, color: '#06b6d4', category: 'Probability' },
    'Random Matrix Theory': { x: 700, y: 540, color: '#06b6d4', category: 'Probability' },
    'Ergodic Theory': { x: 780, y: 600, color: '#06b6d4', category: 'Probability' },
    
    // Applied Mathematics (expanded)
    'Numerical Analysis': { x: 920, y: 340, color: '#f97316', category: 'Applied' },
    'Numerical Linear Algebra': { x: 1000, y: 400, color: '#f97316', category: 'Applied' },
    'Optimization': { x: 860, y: 620, color: '#f97316', category: 'Applied' },
    'Control Theory': { x: 760, y: 680, color: '#f97316', category: 'Applied' },
    'Dynamical Systems': { x: 900, y: 250, color: '#f97316', category: 'Applied' },
    'Information Theory': { x: 1020, y: 620, color: '#f97316', category: 'Applied' },
    'Signal Processing': { x: 780, y: 740, color: '#f97316', category: 'Applied' },
    'Cryptography': { x: 100, y: 700, color: '#f97316', category: 'Applied' },
    'Computational Complexity': { x: 60, y: 200, color: '#f97316', category: 'Applied' },
    'Machine Learning': { x: 960, y: 680, color: '#f97316', category: 'Applied' },
    'Game Theory': { x: 860, y: 740, color: '#f97316', category: 'Applied' },
    'Mathematical Finance': { x: 940, y: 740, color: '#f97316', category: 'Applied' },
    'Inverse Problems': { x: 680, y: 440, color: '#f97316', category: 'Applied' },
    'Computational Geometry': { x: 1020, y: 340, color: '#f97316', category: 'Applied' },
    
    // Physics
    'Mathematical Physics': { x: 500, y: 680, color: '#ef4444', category: 'Physics' },
    'Quantum Mechanics': { x: 600, y: 740, color: '#ef4444', category: 'Physics' },
    'Classical Mechanics': { x: 400, y: 660, color: '#ef4444', category: 'Physics' },
    'Relativity': { x: 500, y: 760, color: '#ef4444', category: 'Physics' },
    'QFT': { x: 660, y: 680, color: '#ef4444', category: 'Physics' },
    
    // Grand Unification
    'Langlands Program': { x: 120, y: 780, color: '#8b5cf6', category: 'Unification' },
  };
  
  const edges = [
    // Foundations
    ['Set Theory', 'Logic', 3],
    ['Category Theory', 'Set Theory', 2],
    ['Type Theory', 'Logic', 3],
    ['Type Theory', 'Category Theory', 2],
    ['Model Theory', 'Logic', 3],
    ['Model Theory', 'Set Theory', 2],
    ['Computability', 'Logic', 3],
    ['Computability', 'Set Theory', 2],
    
    // Algebraic structures
    ['Groups', 'Set Theory', 2],
    ['Rings', 'Groups', 3],
    ['Fields', 'Rings', 3],
    ['Vector Spaces', 'Fields', 3],
    ['Algebras', 'Vector Spaces', 3],
    ['Algebras', 'Rings', 2],
    
    // Core algebra connections
    ['Group Theory', 'Groups', 3],
    ['Linear Algebra', 'Vector Spaces', 3],
    ['Linear Algebra', 'Fields', 2],
    ['Multilinear Algebra', 'Linear Algebra', 3],
    ['Multilinear Algebra', 'Algebras', 2],
    ['Commutative Algebra', 'Rings', 3],
    ['Homological Algebra', 'Category Theory', 3],
    ['Representation Theory', 'Linear Algebra', 3],
    ['Representation Theory', 'Group Theory', 3],
    ['Representation Theory', 'Algebras', 2],
    ['Lie Theory', 'Groups', 2],
    ['Lie Theory', 'Algebras', 3],
    ['Lie Theory', 'Differential Geometry', 2],
    ['Clifford Algebras / GA', 'Algebras', 3],
    ['Clifford Algebras / GA', 'Linear Algebra', 2],
    ['Clifford Algebras / GA', 'Representation Theory', 2],
    
    // Analysis
    ['Real Analysis', 'Set Theory', 2],
    ['Real Analysis', 'Fields', 2],
    ['Real Analysis', 'Topology', 2],
    ['Complex Analysis', 'Real Analysis', 3],
    ['Complex Analysis', 'Fields', 2],
    ['Measure Theory', 'Real Analysis', 3],
    ['Measure Theory', 'Set Theory', 2],
    ['Metric Spaces', 'Topology', 3],
    ['Metric Spaces', 'Real Analysis', 2],
    ['Functional Analysis', 'Linear Algebra', 3],
    ['Functional Analysis', 'Real Analysis', 3],
    ['Functional Analysis', 'Measure Theory', 3],
    ['Functional Analysis', 'Topology', 3],
    ['Harmonic Analysis', 'Functional Analysis', 2],
    ['Harmonic Analysis', 'Measure Theory', 2],
    ['Harmonic Analysis', 'Representation Theory', 2],
    ['ODEs', 'Real Analysis', 3],
    ['ODEs', 'Linear Algebra', 2],
    ['PDEs', 'Real Analysis', 3],
    ['PDEs', 'Functional Analysis', 3],
    ['PDEs', 'Measure Theory', 2],
    ['Calculus of Variations', 'Real Analysis', 3],
    ['Calculus of Variations', 'Functional Analysis', 2],
    ['Operator Algebras', 'Functional Analysis', 3],
    ['Operator Algebras', 'Algebras', 2],
    ['Nonlinear Analysis', 'Functional Analysis', 3],
    ['Nonlinear Analysis', 'PDEs', 2],
    ['Approximation Theory', 'Real Analysis', 3],
    ['Approximation Theory', 'Linear Algebra', 2],
    
    // Geometry & Topology
    ['Topology', 'Set Theory', 2],
    ['Algebraic Topology', 'Topology', 3],
    ['Algebraic Topology', 'Group Theory', 3],
    ['Algebraic Topology', 'Category Theory', 2],
    ['Algebraic Topology', 'Homological Algebra', 3],
    ['Differential Geometry', 'Real Analysis', 3],
    ['Differential Geometry', 'Topology', 3],
    ['Differential Geometry', 'Linear Algebra', 3],
    ['Differential Geometry', 'Multilinear Algebra', 2],
    ['Riemannian Geometry', 'Differential Geometry', 3],
    ['Riemannian Geometry', 'Linear Algebra', 2],
    ['Symplectic Geometry', 'Differential Geometry', 3],
    ['Symplectic Geometry', 'Lie Theory', 2],
    ['Algebraic Geometry', 'Commutative Algebra', 3],
    ['Algebraic Geometry', 'Topology', 2],
    ['Algebraic Geometry', 'Complex Analysis', 2],
    ['Algebraic Geometry', 'Category Theory', 2],
    ['Algebraic Geometry', 'Homological Algebra', 3],
    ['Projective Geometry', 'Linear Algebra', 3],
    ['Projective Geometry', 'Algebraic Geometry', 2],
    ['Convex Geometry', 'Linear Algebra', 3],
    ['Convex Geometry', 'Real Analysis', 2],
    ['Convex Geometry', 'Optimization', 2],
    ['Knot Theory', 'Algebraic Topology', 3],
    ['Knot Theory', 'Group Theory', 2],
    ['Discrete Geometry', 'Combinatorics', 2],
    ['Discrete Geometry', 'Linear Algebra', 2],
    ['Discrete Geometry', 'Convex Geometry', 2],
    
    // Number Theory
    ['Number Theory', 'Rings', 2],
    ['Algebraic NT', 'Number Theory', 3],
    ['Algebraic NT', 'Fields', 3],
    ['Algebraic NT', 'Group Theory', 2],
    ['Algebraic NT', 'Commutative Algebra', 2],
    ['Analytic NT', 'Number Theory', 3],
    ['Analytic NT', 'Complex Analysis', 3],
    ['Analytic NT', 'Real Analysis', 2],
    ['Arithmetic Geometry', 'Algebraic NT', 3],
    ['Arithmetic Geometry', 'Algebraic Geometry', 3],
    
    // Combinatorics
    ['Combinatorics', 'Set Theory', 2],
    ['Combinatorics', 'Probability', 2],
    ['Graph Theory', 'Combinatorics', 3],
    ['Graph Theory', 'Linear Algebra', 2],
    ['Graph Theory', 'Algebraic Topology', 1],
    ['Coding Theory', 'Linear Algebra', 3],
    ['Coding Theory', 'Combinatorics', 2],
    ['Coding Theory', 'Fields', 2],
    ['Boolean Functions', 'Combinatorics', 3],
    ['Boolean Functions', 'Probability', 2],
    ['Boolean Functions', 'Harmonic Analysis', 2],
    ['Matroid Theory', 'Combinatorics', 3],
    ['Matroid Theory', 'Linear Algebra', 2],
    ['Matroid Theory', 'Graph Theory', 2],
    
    // Probability & Statistics
    ['Probability', 'Measure Theory', 3],
    ['Probability', 'Real Analysis', 2],
    ['Stochastic Processes', 'Probability', 3],
    ['Stochastic Processes', 'Functional Analysis', 2],
    ['Statistics', 'Probability', 3],
    ['Statistics', 'Linear Algebra', 2],
    ['Markov Chains', 'Probability', 3],
    ['Markov Chains', 'Linear Algebra', 2],
    ['Markov Chains', 'Graph Theory', 2],
    ['Monte Carlo', 'Probability', 3],
    ['Monte Carlo', 'Markov Chains', 2],
    ['Monte Carlo', 'Statistics', 2],
    ['Random Matrix Theory', 'Probability', 3],
    ['Random Matrix Theory', 'Linear Algebra', 3],
    ['Random Matrix Theory', 'Complex Analysis', 2],
    ['Ergodic Theory', 'Measure Theory', 3],
    ['Ergodic Theory', 'Dynamical Systems', 3],
    ['Ergodic Theory', 'Probability', 2],
    
    // Applied Mathematics
    ['Numerical Analysis', 'Linear Algebra', 3],
    ['Numerical Analysis', 'Real Analysis', 3],
    ['Numerical Analysis', 'ODEs', 2],
    ['Numerical Analysis', 'PDEs', 2],
    ['Numerical Linear Algebra', 'Linear Algebra', 3],
    ['Numerical Linear Algebra', 'Numerical Analysis', 3],
    ['Optimization', 'Linear Algebra', 3],
    ['Optimization', 'Real Analysis', 2],
    ['Optimization', 'Calculus of Variations', 2],
    ['Optimization', 'Convex Geometry', 2],
    ['Control Theory', 'ODEs', 3],
    ['Control Theory', 'Linear Algebra', 3],
    ['Control Theory', 'Optimization', 2],
    ['Dynamical Systems', 'ODEs', 3],
    ['Dynamical Systems', 'Topology', 2],
    ['Dynamical Systems', 'Measure Theory', 2],
    ['Information Theory', 'Probability', 3],
    ['Information Theory', 'Linear Algebra', 2],
    ['Information Theory', 'Coding Theory', 2],
    ['Signal Processing', 'Harmonic Analysis', 3],
    ['Signal Processing', 'Linear Algebra', 2],
    ['Signal Processing', 'Probability', 2],
    ['Cryptography', 'Number Theory', 3],
    ['Cryptography', 'Group Theory', 2],
    ['Cryptography', 'Algebraic Geometry', 2],
    ['Cryptography', 'Computational Complexity', 2],
    ['Computational Complexity', 'Logic', 3],
    ['Computational Complexity', 'Computability', 3],
    ['Computational Complexity', 'Combinatorics', 2],
    ['Computational Complexity', 'Boolean Functions', 2],
    ['Machine Learning', 'Statistics', 3],
    ['Machine Learning', 'Optimization', 3],
    ['Machine Learning', 'Linear Algebra', 3],
    ['Machine Learning', 'Probability', 2],
    ['Game Theory', 'Probability', 2],
    ['Game Theory', 'Optimization', 2],
    ['Game Theory', 'Linear Algebra', 2],
    ['Mathematical Finance', 'Stochastic Processes', 3],
    ['Mathematical Finance', 'PDEs', 2],
    ['Mathematical Finance', 'Optimization', 2],
    ['Inverse Problems', 'Functional Analysis', 3],
    ['Inverse Problems', 'PDEs', 2],
    ['Inverse Problems', 'Numerical Analysis', 2],
    ['Computational Geometry', 'Discrete Geometry', 3],
    ['Computational Geometry', 'Combinatorics', 2],
    ['Computational Geometry', 'Graph Theory', 2],
    
    // Mathematical Physics
    ['Mathematical Physics', 'Differential Geometry', 3],
    ['Mathematical Physics', 'Functional Analysis', 3],
    ['Mathematical Physics', 'Lie Theory', 3],
    ['Mathematical Physics', 'PDEs', 3],
    ['Mathematical Physics', 'Representation Theory', 2],
    ['Quantum Mechanics', 'Functional Analysis', 3],
    ['Quantum Mechanics', 'Linear Algebra', 3],
    ['Quantum Mechanics', 'Representation Theory', 2],
    ['Quantum Mechanics', 'Lie Theory', 2],
    ['Classical Mechanics', 'Symplectic Geometry', 3],
    ['Classical Mechanics', 'Calculus of Variations', 3],
    ['Classical Mechanics', 'ODEs', 2],
    ['Relativity', 'Riemannian Geometry', 3],
    ['Relativity', 'Differential Geometry', 3],
    ['Relativity', 'PDEs', 2],
    ['QFT', 'Functional Analysis', 3],
    ['QFT', 'Representation Theory', 3],
    ['QFT', 'Differential Geometry', 2],
    ['QFT', 'Probability', 2],
    ['QFT', 'Algebraic Topology', 2],
    
    // Langlands
    ['Langlands Program', 'Representation Theory', 3],
    ['Langlands Program', 'Algebraic NT', 3],
    ['Langlands Program', 'Algebraic Geometry', 3],
    ['Langlands Program', 'Harmonic Analysis', 2],
    ['Langlands Program', 'Category Theory', 2],
  ];

  // Detailed descriptions with key elements
  const fieldDetails = {
    'Logic': {
      description: 'The formal study of valid reasoning and inference. Logic provides the grammatical rules for all mathematical statements and proofs, establishing what constitutes a valid argument.',
      keyElements: [
        'Propositional logic — truth tables, connectives (∧, ∨, ¬, →)',
        'Predicate logic — quantifiers (∀, ∃), variables, predicates',
        'Proof theory — formal systems, deduction rules, sequent calculus',
        'Gödel\'s incompleteness theorems — limits of formal systems',
        'Non-classical logics — intuitionistic, modal, many-valued'
      ],
      prerequisites: 'None — this is foundational',
      applications: 'Computer science, AI, philosophy, all of mathematics'
    },
    'Set Theory': {
      description: 'The study of collections of objects and their properties. Set theory provides the ontological foundation for almost all of mathematics — nearly every mathematical object can be constructed from sets.',
      keyElements: [
        'ZFC axioms — Zermelo-Fraenkel axioms with Choice',
        'Ordinals and cardinals — transfinite arithmetic',
        'Power sets, unions, intersections',
        'Russell\'s paradox and the need for axiomatization',
        'Axiom of Choice — equivalent to Zorn\'s lemma, well-ordering',
        'Continuum hypothesis — independent of ZFC'
      ],
      prerequisites: 'Logic',
      applications: 'Foundation for all mathematics, forcing, large cardinals'
    },
    'Category Theory': {
      description: 'The mathematics of mathematical structure itself. Instead of studying objects directly, category theory studies the relationships (morphisms) between objects and how structures relate to each other.',
      keyElements: [
        'Categories — objects + morphisms + composition',
        'Functors — structure-preserving maps between categories',
        'Natural transformations — maps between functors',
        'Universal properties — defining objects by relationships',
        'Limits/colimits — products, coproducts, pullbacks, pushouts',
        'Adjoint functors — the most important concept',
        'Yoneda lemma — objects determined by their morphisms'
      ],
      prerequisites: 'Mathematical maturity, examples from algebra/topology',
      applications: 'Unifying language, algebraic geometry, logic, CS, physics'
    },
    'Type Theory': {
      description: 'An alternative foundation for mathematics where every expression has a type. Types prevent paradoxes and connect proofs with programs via the Curry-Howard correspondence.',
      keyElements: [
        'Simple types — base types + function types (A → B)',
        'Dependent types — types depending on values',
        'Curry-Howard — proofs are programs, propositions are types',
        'Martin-Löf type theory — constructive foundation',
        'Homotopy type theory — types as spaces, equality as paths',
        'Proof assistants — Coq, Lean, Agda'
      ],
      prerequisites: 'Logic, some programming experience helps',
      applications: 'Proof verification, programming languages, foundations'
    },
    'Model Theory': {
      description: 'The study of relationships between formal languages and their interpretations (models). Asks: what structures satisfy a given set of axioms? What can be expressed in a given language?',
      keyElements: [
        'Structures and interpretations',
        'Compactness theorem — finite satisfiability implies satisfiability',
        'Löwenheim-Skolem — countable models of first-order theories',
        'Quantifier elimination',
        'Types and saturation',
        'Stability theory — Shelah\'s classification program',
        'O-minimality — tame geometry'
      ],
      prerequisites: 'Logic, Set Theory',
      applications: 'Algebra, number theory, real algebraic geometry'
    },
    'Computability': {
      description: 'The study of what can be computed in principle. Establishes fundamental limits on mechanical procedures, independent of any particular machine or programming language.',
      keyElements: [
        'Turing machines — formal model of computation',
        'Church-Turing thesis — captures "effective computability"',
        'Halting problem — undecidable',
        'Recursive and recursively enumerable sets',
        'Degrees of unsolvability — Turing degrees',
        'Kolmogorov complexity — algorithmic information',
        'Rice\'s theorem — non-trivial properties are undecidable'
      ],
      prerequisites: 'Logic, Set Theory',
      applications: 'Theoretical CS, logic, foundations of mathematics'
    },
    'Groups': {
      description: 'Sets with an associative binary operation, identity element, and inverses. Groups formalize the concept of symmetry and are fundamental throughout mathematics and physics.',
      keyElements: [
        'Axioms: closure, associativity, identity, inverses',
        'Subgroups, cosets, Lagrange\'s theorem',
        'Normal subgroups and quotient groups',
        'Homomorphisms and isomorphisms',
        'Group actions on sets',
        'Algebraic hierarchy: Magma → Semigroup (+ associativity) → Monoid (+ identity) → Group (+ inverses) → Abelian group (+ commutativity)',
        'Examples: ℤ, Sₙ, GL(n), dihedral groups'
      ],
      prerequisites: 'Set Theory',
      applications: 'Symmetry everywhere — physics, chemistry, cryptography'
    },
    'Rings': {
      description: 'Sets with two operations (addition and multiplication) where addition forms an abelian group, multiplication is associative, and multiplication distributes over addition.',
      keyElements: [
        'Ring axioms and basic properties',
        'Ideals — additive subgroups closed under multiplication',
        'Quotient rings R/I',
        'Prime and maximal ideals',
        'Integral domains and fields',
        'Polynomial rings R[x]',
        'PIDs and UFDs — factorization theory',
        'Modules over rings — generalized vector spaces'
      ],
      prerequisites: 'Groups',
      applications: 'Number theory, algebraic geometry, commutative algebra'
    },
    'Fields': {
      description: 'Rings where every nonzero element has a multiplicative inverse. Fields are where division always works. The rationals, reals, complex numbers, and finite fields are all fields.',
      keyElements: [
        'Field axioms — ring + multiplicative inverses',
        'Field extensions — F ⊆ K',
        'Algebraic vs transcendental extensions',
        'Splitting fields and algebraic closure',
        'Galois theory — symmetries of extensions',
        'Finite fields 𝔽ₚ and 𝔽ₚⁿ',
        'Characteristic of a field'
      ],
      prerequisites: 'Rings',
      applications: 'Linear algebra, Galois theory, coding theory, cryptography'
    },
    'Vector Spaces': {
      description: 'Modules over a field — sets with vector addition and scalar multiplication. The setting for linear algebra. Every vector space has a basis, and dimension is well-defined.',
      keyElements: [
        'Axioms of vector spaces',
        'Linear independence and spanning sets',
        'Bases and dimension',
        'Subspaces and quotient spaces',
        'Direct sums V ⊕ W',
        'Dual spaces V* = Hom(V, F)',
        'Inner product spaces',
        'Tensor products V ⊗ W'
      ],
      prerequisites: 'Fields',
      applications: 'All of linear algebra, functional analysis, quantum mechanics'
    },
    'Algebras': {
      description: 'Vector spaces equipped with a bilinear multiplication. Algebras combine linear structure with a product, enabling rich algebraic theory. Includes associative, Lie, and other types.',
      keyElements: [
        'Bilinear product on a vector space',
        'Associative algebras — (ab)c = a(bc)',
        'Lie algebras — [x,y] = -[y,x], Jacobi identity',
        'Division algebras — ℝ, ℂ, ℍ (quaternions), 𝕆 (octonions)',
        'Matrix algebras Mₙ(F)',
        'Exterior and symmetric algebras',
        'Graded algebras'
      ],
      prerequisites: 'Vector Spaces, Rings',
      applications: 'Lie theory, quantum mechanics, differential geometry'
    },
    'Linear Algebra': {
      description: 'THE SUBSTRATE OF MATHEMATICS. The study of vector spaces and linear maps. Nearly every branch uses linear algebra because linearization is the fundamental approximation technique.',
      keyElements: [
        'Linear maps T(av + bw) = aT(v) + bT(w)',
        'Matrices as representations of linear maps',
        'Eigenvalues and eigenvectors — Tv = λv',
        'Diagonalization and Jordan normal form',
        'Inner products and orthogonality',
        'Spectral theorem for symmetric matrices',
        'SVD — singular value decomposition',
        'Determinants, trace, rank, nullity'
      ],
      prerequisites: 'Vector Spaces, Fields',
      applications: 'Everything — physics, engineering, CS, statistics, optimization'
    },
    'Group Theory': {
      description: 'The deep study of groups: their structure, classification, and actions. Includes finite groups, Lie groups, and representation theory connecting groups to linear algebra.',
      keyElements: [
        'Sylow theorems — existence of p-subgroups',
        'Classification of finite simple groups',
        'Solvable and nilpotent groups',
        'Free groups and presentations',
        'Group actions, orbits, stabilizers',
        'Burnside\'s lemma — counting with symmetry',
        'Symmetric groups Sₙ and alternating groups Aₙ'
      ],
      prerequisites: 'Groups',
      applications: 'Physics (symmetry), chemistry, cryptography, combinatorics'
    },
    'Commutative Algebra': {
      description: 'The study of commutative rings, especially those arising in algebraic geometry and number theory. Provides the algebraic foundation for studying geometric objects defined by polynomials.',
      keyElements: [
        'Prime spectrum Spec(R)',
        'Localization at prime ideals',
        'Noetherian rings — ACC on ideals',
        'Primary decomposition',
        'Integral extensions',
        'Krull dimension',
        'Regular local rings',
        'Completion'
      ],
      prerequisites: 'Rings',
      applications: 'Algebraic geometry, algebraic number theory'
    },
    'Homological Algebra': {
      description: 'The study of chain complexes, exact sequences, and derived functors. Provides computational tools that reveal deep structural properties across many areas of mathematics.',
      keyElements: [
        'Chain complexes — sequences with d² = 0',
        'Homology and cohomology H = ker d / im d',
        'Exact sequences 0 → A → B → C → 0',
        'Snake lemma, five lemma',
        'Projective and injective resolutions',
        'Derived functors Ext, Tor',
        'Spectral sequences'
      ],
      prerequisites: 'Category Theory, Rings',
      applications: 'Algebraic topology, algebraic geometry, group cohomology'
    },
    'Representation Theory': {
      description: 'How abstract algebraic structures (groups, algebras, Lie groups) act on vector spaces. Converts abstract algebra into linear algebra, making it computable.',
      keyElements: [
        'Representations — homomorphisms G → GL(V)',
        'Irreducible representations',
        'Complete reducibility — Maschke\'s theorem',
        'Characters and orthogonality relations',
        'Schur\'s lemma',
        'Induced representations',
        'Weights and roots for Lie algebras',
        'Peter-Weyl theorem'
      ],
      prerequisites: 'Linear Algebra, Group Theory, Algebras',
      applications: 'Physics (particles), chemistry, number theory'
    },
    'Lie Theory': {
      description: 'The study of Lie groups (smooth groups) and Lie algebras (their infinitesimal structure). Bridges algebra, geometry, and analysis for continuous symmetry.',
      keyElements: [
        'Lie groups — smooth manifolds that are groups',
        'Lie algebras — tangent space at identity with bracket',
        'Exponential map exp: 𝔤 → G',
        'Classical groups GL, SL, O, SO, U, SU, Sp',
        'Root systems and Dynkin diagrams',
        'Classification: Aₙ, Bₙ, Cₙ, Dₙ, G₂, F₄, E₆, E₇, E₈',
        'Universal enveloping algebra'
      ],
      prerequisites: 'Groups, Algebras, Differential Geometry',
      applications: 'Physics (gauge theory), differential geometry'
    },
    'Clifford Algebras / GA': {
      description: 'Algebras generated by a vector space with quadratic form, generalizing complex numbers, quaternions, and exterior algebras. Also known as Geometric Algebra (GA) when emphasizing geometric interpretation.',
      keyElements: [
        'Defining relation v² = Q(v)·1',
        'Geometric product = inner + outer product',
        'Multivectors: scalars, vectors, bivectors, ...',
        'Rotors — even elements with RR̃ = 1',
        'Spin groups — double covers of SO(n)',
        'Spinors — elements of minimal left ideals',
        'Periodicity (Bott periodicity)',
        'Conformal geometric algebra'
      ],
      prerequisites: 'Linear Algebra, Algebras',
      applications: 'Physics (Dirac equation, spinors), computer graphics, robotics'
    },
    'Multilinear Algebra': {
      description: 'Tensors, exterior products, and multilinear maps. Extends linear algebra to handle objects depending on multiple vector inputs, essential for differential geometry.',
      keyElements: [
        'Tensor products V ⊗ W',
        'Tensors of type (p,q)',
        'Exterior algebra ΛV — wedge product',
        'Symmetric algebra',
        'Determinants as alternating multilinear maps',
        'Tensor contraction',
        'Einstein summation convention',
        'Differential forms'
      ],
      prerequisites: 'Linear Algebra, Algebras',
      applications: 'Differential geometry, physics (GR, continuum mechanics), ML'
    },
    'Real Analysis': {
      description: 'The rigorous foundation of calculus. Formalizes limits, continuity, differentiation, and integration with precise ε-δ definitions.',
      keyElements: [
        'ε-δ definitions of limits and continuity',
        'Completeness of ℝ — Cauchy sequences converge',
        'Compactness — Heine-Borel theorem',
        'Uniform continuity and convergence',
        'Differentiation as best linear approximation',
        'Riemann integration',
        'Series convergence tests',
        'Sequences of functions'
      ],
      prerequisites: 'Set Theory, Fields, Topology',
      applications: 'All of analysis, physics, probability, numerical methods'
    },
    'Complex Analysis': {
      description: 'Calculus with complex numbers. Surprisingly rigid: knowing an analytic function on a tiny region determines it everywhere. This rigidity makes it incredibly powerful.',
      keyElements: [
        'Holomorphic/analytic functions',
        'Cauchy-Riemann equations',
        'Cauchy integral formula',
        'Power series representations',
        'Residue theorem',
        'Conformal mappings',
        'Riemann surfaces',
        'Analytic continuation'
      ],
      prerequisites: 'Real Analysis, Fields',
      applications: 'Number theory, physics, engineering, PDEs'
    },
    'Measure Theory': {
      description: 'The rigorous foundation of integration and probability. Defines "size" for sets consistently, enabling the Lebesgue integral and probability theory.',
      keyElements: [
        'σ-algebras',
        'Measures — μ(∅) = 0, countable additivity',
        'Lebesgue measure on ℝⁿ',
        'Measurable functions',
        'Lebesgue integral',
        'Dominated and monotone convergence',
        'Fubini\'s theorem',
        'Lᵖ spaces'
      ],
      prerequisites: 'Real Analysis, Set Theory',
      applications: 'Probability, functional analysis, PDEs, ergodic theory'
    },
    'Metric Spaces': {
      description: 'Sets with a distance function. Bridges abstract topology and concrete analysis, providing the setting for convergence, continuity, and completeness.',
      keyElements: [
        'Metric axioms: positivity, symmetry, triangle inequality',
        'Open/closed balls and sets',
        'Convergence and Cauchy sequences',
        'Completeness',
        'Compactness in metric spaces',
        'Banach fixed-point theorem',
        'Completion of metric spaces'
      ],
      prerequisites: 'Topology, Real Analysis',
      applications: 'Analysis, topology, fixed-point theory'
    },
    'Functional Analysis': {
      description: 'Infinite-dimensional linear algebra combined with topology and measure theory. Studies spaces of functions as geometric objects, essential for quantum mechanics and PDEs.',
      keyElements: [
        'Normed spaces and Banach spaces',
        'Inner product spaces and Hilbert spaces',
        'Bounded linear operators',
        'Hahn-Banach theorem',
        'Open mapping and closed graph theorems',
        'Spectral theory',
        'Compact operators',
        'Distributions (generalized functions)'
      ],
      prerequisites: 'Linear Algebra, Real Analysis, Measure Theory, Topology',
      applications: 'Quantum mechanics, PDEs, signal processing'
    },
    'Harmonic Analysis': {
      description: 'Functions analyzed through frequency components. Generalizes Fourier analysis to groups, homogeneous spaces, and abstract settings.',
      keyElements: [
        'Fourier series — decomposition into eⁱⁿˣ',
        'Fourier transform',
        'Plancherel theorem',
        'Convolution',
        'Pontryagin duality',
        'Representation theory of groups',
        'Wavelets',
        'Singular integrals'
      ],
      prerequisites: 'Functional Analysis, Measure Theory, Representation Theory',
      applications: 'Signal processing, PDEs, number theory'
    },
    'ODEs': {
      description: 'Ordinary Differential Equations: equations involving functions of one variable and their derivatives. Describes how systems evolve in time.',
      keyElements: [
        'First-order equations y\' = f(x,y)',
        'Linear systems y\' = Ay',
        'Existence and uniqueness (Picard-Lindelöf)',
        'Phase portraits and stability',
        'Equilibria classification',
        'Linearization',
        'Periodic orbits',
        'Bifurcations'
      ],
      prerequisites: 'Real Analysis, Linear Algebra',
      applications: 'Physics, biology, engineering, control theory'
    },
    'PDEs': {
      description: 'Partial Differential Equations: functions of multiple variables and their partial derivatives. The language of physics — heat, waves, fluids, electromagnetism, quantum mechanics.',
      keyElements: [
        'Classification: elliptic, parabolic, hyperbolic',
        'Heat equation uₜ = Δu',
        'Wave equation uₜₜ = c²Δu',
        'Laplace equation Δu = 0',
        'Boundary and initial conditions',
        'Weak solutions',
        'Sobolev spaces',
        'Existence, uniqueness, regularity'
      ],
      prerequisites: 'Real Analysis, Functional Analysis, Measure Theory',
      applications: 'Physics, engineering, finance, biology'
    },
    'Calculus of Variations': {
      description: 'Finding functions that extremize integrals. Instead of optimizing f(x), find curves y(x) that optimize ∫L(x,y,y\')dx. The mathematical foundation of classical mechanics.',
      keyElements: [
        'Functionals — maps from functions to numbers',
        'Euler-Lagrange equations',
        'Lagrangian mechanics',
        'Hamilton\'s principle',
        'Constraints and Lagrange multipliers',
        'Isoperimetric problems',
        'Direct methods',
        'Noether\'s theorem'
      ],
      prerequisites: 'Real Analysis, Functional Analysis',
      applications: 'Classical mechanics, optics, optimal control'
    },
    'Operator Algebras': {
      description: 'The study of algebras of bounded operators on Hilbert spaces. C*-algebras and von Neumann algebras provide the mathematical framework for quantum mechanics and quantum field theory.',
      keyElements: [
        'C*-algebras — norm-closed *-subalgebras of B(H)',
        'von Neumann algebras — weakly closed',
        'GNS construction',
        'States and representations',
        'Classification of factors',
        'K-theory for C*-algebras',
        'Noncommutative geometry',
        'Tomita-Takesaki theory'
      ],
      prerequisites: 'Functional Analysis, Algebras',
      applications: 'Quantum mechanics, quantum field theory, noncommutative geometry'
    },
    'Nonlinear Analysis': {
      description: 'Analysis beyond linear approximations. Studies nonlinear equations, fixed-point theorems, and variational methods for problems where linearity fails.',
      keyElements: [
        'Fixed-point theorems (Brouwer, Schauder, Leray-Schauder)',
        'Degree theory',
        'Bifurcation theory',
        'Critical point theory',
        'Mountain pass theorem',
        'Nonlinear PDEs',
        'Calculus in Banach spaces',
        'Monotone operators'
      ],
      prerequisites: 'Functional Analysis, PDEs',
      applications: 'Nonlinear PDEs, mathematical physics, optimization'
    },
    'Approximation Theory': {
      description: 'How well can functions be approximated by simpler ones? Studies polynomial, rational, and other approximations, with applications to numerical analysis and learning theory.',
      keyElements: [
        'Weierstrass approximation theorem',
        'Best approximation in normed spaces',
        'Chebyshev polynomials',
        'Interpolation theory',
        'Splines',
        'Approximation in Lᵖ spaces',
        'Rates of convergence',
        'Kolmogorov widths'
      ],
      prerequisites: 'Real Analysis, Linear Algebra',
      applications: 'Numerical analysis, signal processing, machine learning'
    },
    'Topology': {
      description: 'Properties preserved under continuous deformation — stretching and bending, but not tearing or gluing. Studies what remains invariant when rigid structure is ignored.',
      keyElements: [
        'Open sets and topological spaces',
        'Continuity — preimages of open sets are open',
        'Compactness',
        'Connectedness',
        'Separation axioms',
        'Product and quotient topologies',
        'Homeomorphism',
        'Homotopy'
      ],
      prerequisites: 'Set Theory',
      applications: 'Analysis, geometry, algebraic topology, data science'
    },
    'Differential Geometry': {
      description: 'Calculus on curved spaces. Studies smooth manifolds, tangent spaces, and geometric structures. The mathematical language of modern physics.',
      keyElements: [
        'Smooth manifolds',
        'Tangent spaces and vector fields',
        'Differential forms',
        'Exterior derivative d',
        'Stokes\' theorem ∫_M dω = ∫_∂M ω',
        'Connections and covariant derivatives',
        'Curvature',
        'Fiber bundles'
      ],
      prerequisites: 'Real Analysis, Linear Algebra, Topology, Multilinear Algebra',
      applications: 'General relativity, gauge theory, mechanics'
    },
    'Riemannian Geometry': {
      description: 'Differential geometry with a metric: measuring lengths and angles. The natural setting for studying curved spaces with geometry, including general relativity.',
      keyElements: [
        'Riemannian metric gᵢⱼ',
        'Lengths of curves',
        'Geodesics',
        'Levi-Civita connection',
        'Curvature tensors (Riemann, Ricci, scalar)',
        'Sectional curvature',
        'Comparison theorems',
        'Gauss-Bonnet theorem'
      ],
      prerequisites: 'Differential Geometry, Linear Algebra',
      applications: 'General relativity, geometric analysis, machine learning'
    },
    'Symplectic Geometry': {
      description: 'The geometry of phase space: position-momentum pairs. A symplectic form is a closed, non-degenerate 2-form. The natural setting for Hamiltonian mechanics.',
      keyElements: [
        'Symplectic forms — closed and non-degenerate',
        'Darboux theorem',
        'Hamiltonian vector fields',
        'Poisson brackets',
        'Lagrangian submanifolds',
        'Symplectomorphisms',
        'Moment maps',
        'Gromov non-squeezing'
      ],
      prerequisites: 'Differential Geometry, Lie Theory',
      applications: 'Classical mechanics, quantization, mirror symmetry'
    },
    'Algebraic Topology': {
      description: 'Using algebraic invariants to study topological spaces. Assigns groups, rings, or modules to spaces in a way preserved by continuous maps.',
      keyElements: [
        'Fundamental group π₁',
        'Covering spaces',
        'Higher homotopy groups πₙ',
        'Homology Hₙ',
        'Cohomology Hⁿ',
        'Exact sequences',
        'Cup product',
        'Characteristic classes'
      ],
      prerequisites: 'Topology, Group Theory, Category Theory, Homological Algebra',
      applications: 'Geometry, physics, data science (TDA)'
    },
    'Algebraic Geometry': {
      description: 'Geometry of polynomial equations. Modern algebraic geometry uses schemes and sheaves, connecting geometry, algebra, and number theory.',
      keyElements: [
        'Varieties — solution sets of polynomials',
        'Schemes (Grothendieck)',
        'Sheaves',
        'Cohomology of sheaves',
        'Divisors and line bundles',
        'Intersection theory',
        'Moduli spaces',
        'Étale cohomology'
      ],
      prerequisites: 'Commutative Algebra, Topology, Complex Analysis, Category Theory',
      applications: 'Number theory, cryptography, string theory'
    },
    'Projective Geometry': {
      description: 'Geometry where parallel lines meet at infinity. Studies properties invariant under projection, providing a natural setting for perspective and duality.',
      keyElements: [
        'Projective space ℙⁿ',
        'Homogeneous coordinates',
        'Projective transformations',
        'Cross-ratio — the fundamental invariant',
        'Duality — points ↔ hyperplanes',
        'Projective varieties',
        'Grassmannians',
        'Plücker embedding'
      ],
      prerequisites: 'Linear Algebra, Algebraic Geometry',
      applications: 'Computer vision, algebraic geometry, physics'
    },
    'Convex Geometry': {
      description: 'The geometry of convex sets — sets containing all line segments between their points. Rich interplay with optimization, probability, and combinatorics.',
      keyElements: [
        'Convex sets and convex hulls',
        'Supporting hyperplanes',
        'Extreme points and Krein-Milman theorem',
        'Convex functions',
        'Duality and polar sets',
        'Brunn-Minkowski inequality',
        'Concentration of measure',
        'Polytopes'
      ],
      prerequisites: 'Linear Algebra, Real Analysis',
      applications: 'Optimization, probability, functional analysis'
    },
    'Knot Theory': {
      description: 'The mathematical study of knots — embeddings of circles in 3-space. Uses algebraic invariants to distinguish knots and connects to physics and biology.',
      keyElements: [
        'Knot diagrams and Reidemeister moves',
        'Knot invariants',
        'Jones polynomial',
        'Fundamental group of knot complement',
        'Seifert surfaces',
        'Braids and braid groups',
        'Link invariants',
        'HOMFLY polynomial'
      ],
      prerequisites: 'Algebraic Topology, Group Theory',
      applications: 'DNA topology, statistical mechanics, quantum computing'
    },
    'Discrete Geometry': {
      description: 'Geometry of discrete structures: polytopes, lattices, tilings. Bridges combinatorics and geometry with applications to optimization and crystallography.',
      keyElements: [
        'Polytopes and polyhedra',
        'Lattices and lattice points',
        'Tilings and tessellations',
        'Packing and covering problems',
        'Minkowski\'s theorems',
        'Ehrhart theory',
        'Voronoi diagrams and Delaunay triangulations',
        'Sphere packing'
      ],
      prerequisites: 'Combinatorics, Linear Algebra, Convex Geometry',
      applications: 'Optimization, crystallography, coding theory'
    },
    'Number Theory': {
      description: 'The "queen of mathematics." Studies integers, primes, and related structures. Despite simple statements, contains some of the deepest mathematics.',
      keyElements: [
        'Divisibility and primes',
        'Congruences a ≡ b (mod n)',
        'Quadratic reciprocity',
        'Diophantine equations',
        'Prime distribution',
        'Continued fractions',
        'p-adic numbers',
        'Modular arithmetic'
      ],
      prerequisites: 'Rings',
      applications: 'Cryptography, coding theory, physics'
    },
    'Algebraic NT': {
      description: 'Number theory using algebraic techniques: field extensions, rings of integers, ideals. The natural setting for understanding primes in number fields.',
      keyElements: [
        'Number fields',
        'Rings of integers',
        'Ideal class group',
        'Dedekind domains',
        'Galois groups',
        'Cyclotomic fields',
        'Local fields ℚₚ',
        'Class field theory'
      ],
      prerequisites: 'Number Theory, Fields, Group Theory, Commutative Algebra',
      applications: 'Cryptography, Fermat\'s Last Theorem'
    },
    'Analytic NT': {
      description: 'Number theory using analysis, especially complex analysis. The Riemann zeta function encodes deep information about prime distribution.',
      keyElements: [
        'Riemann zeta function ζ(s)',
        'Euler product',
        'Prime Number Theorem',
        'Riemann Hypothesis',
        'Dirichlet L-functions',
        'Modular forms',
        'Sieve methods',
        'Circle method'
      ],
      prerequisites: 'Number Theory, Complex Analysis, Real Analysis',
      applications: 'Prime distribution, additive number theory'
    },
    'Arithmetic Geometry': {
      description: 'The intersection of algebraic geometry and number theory. Studies rational and integer points on algebraic varieties, leading to profound results like Fermat\'s Last Theorem.',
      keyElements: [
        'Rational points on varieties',
        'Elliptic curves over ℚ',
        'Mordell-Weil theorem',
        'Height functions',
        'Étale cohomology',
        'l-adic representations',
        'Modularity theorem',
        'Faltings\' theorem'
      ],
      prerequisites: 'Algebraic NT, Algebraic Geometry',
      applications: 'Cryptography (ECC), number theory'
    },
    'Combinatorics': {
      description: 'The mathematics of counting, arrangement, and existence. Studies discrete structures and their properties, often with connections to probability and algebra.',
      keyElements: [
        'Counting techniques — bijections, generating functions',
        'Binomial coefficients and identities',
        'Inclusion-exclusion principle',
        'Pigeonhole principle',
        'Ramsey theory',
        'Extremal combinatorics',
        'Probabilistic method',
        'Algebraic methods'
      ],
      prerequisites: 'Set Theory, Probability',
      applications: 'Computer science, probability, optimization'
    },
    'Graph Theory': {
      description: 'The mathematics of networks: vertices connected by edges. Studies connectivity, paths, cycles, colorings, and flows with applications throughout science.',
      keyElements: [
        'Paths, cycles, trees',
        'Connectivity',
        'Planar graphs and Euler\'s formula',
        'Graph coloring',
        'Matching and covering',
        'Network flows',
        'Spectral graph theory',
        'Random graphs'
      ],
      prerequisites: 'Combinatorics, Linear Algebra',
      applications: 'Networks, algorithms, social science, biology'
    },
    'Coding Theory': {
      description: 'The mathematics of error detection and correction. Studies how to encode information so errors introduced during transmission can be detected or corrected.',
      keyElements: [
        'Linear codes — subspaces of 𝔽ₚⁿ',
        'Hamming distance and weight',
        'Generator and parity-check matrices',
        'Hamming codes, Reed-Solomon codes',
        'Bounds (Singleton, Hamming, Plotkin)',
        'Cyclic codes',
        'LDPC codes',
        'Turbo codes'
      ],
      prerequisites: 'Linear Algebra, Fields, Combinatorics',
      applications: 'Data transmission, storage, cryptography'
    },
    'Boolean Functions': {
      description: 'Functions f: {0,1}ⁿ → {0,1} and their analysis. Combines combinatorics, harmonic analysis, and probability with applications to complexity theory and learning.',
      keyElements: [
        'Truth tables and representations',
        'Fourier analysis on {0,1}ⁿ',
        'Influence of variables',
        'Noise sensitivity and stability',
        'BLR linearity test',
        'Hypercontractivity',
        'Threshold phenomena',
        'Juntas and learning'
      ],
      prerequisites: 'Combinatorics, Probability, Harmonic Analysis',
      applications: 'Complexity theory, learning theory, social choice'
    },
    'Matroid Theory': {
      description: 'Abstract theory of independence. Matroids capture the combinatorial essence of linear independence, graph cycles, and other "independence" structures.',
      keyElements: [
        'Independent sets, bases, circuits',
        'Rank function',
        'Duality',
        'Graphic matroids',
        'Linear/representable matroids',
        'Matroid intersection',
        'Matroid polytope',
        'Tutte polynomial'
      ],
      prerequisites: 'Combinatorics, Linear Algebra, Graph Theory',
      applications: 'Optimization, coding theory, algebraic geometry'
    },
    'Probability': {
      description: 'The rigorous mathematics of randomness, built on measure theory. Provides the foundation for statistics, stochastic processes, and uncertainty quantification.',
      keyElements: [
        'Probability spaces (Ω, ℱ, P)',
        'Random variables',
        'Expectation E[X]',
        'Independence',
        'Conditional probability',
        'Law of large numbers',
        'Central limit theorem',
        'Modes of convergence'
      ],
      prerequisites: 'Measure Theory, Real Analysis',
      applications: 'Statistics, physics, finance, machine learning'
    },
    'Stochastic Processes': {
      description: 'Random evolution over time. Studies collections of random variables indexed by time, including Markov chains, Brownian motion, and martingales.',
      keyElements: [
        'Filtrations and adapted processes',
        'Martingales',
        'Brownian motion',
        'Itô calculus',
        'Stochastic differential equations',
        'Continuous-time Markov processes',
        'Lévy processes',
        'Stopping times'
      ],
      prerequisites: 'Probability, Functional Analysis',
      applications: 'Finance, physics, biology, queueing'
    },
    'Statistics': {
      description: 'Learning from data. Uses probability to make inferences, estimate parameters, test hypotheses, and quantify uncertainty.',
      keyElements: [
        'Point estimation',
        'Confidence intervals',
        'Maximum likelihood',
        'Bayesian inference',
        'Hypothesis testing',
        'Regression',
        'Sufficient statistics',
        'Decision theory'
      ],
      prerequisites: 'Probability, Linear Algebra',
      applications: 'Science, medicine, social science, ML, industry'
    },
    'Markov Chains': {
      description: 'Random processes where the future depends only on the present, not the past. Fundamental for modeling and computation, including MCMC methods.',
      keyElements: [
        'Transition matrices',
        'Stationary distributions',
        'Irreducibility and aperiodicity',
        'Convergence to equilibrium',
        'Mixing time',
        'Reversibility and detailed balance',
        'Hitting times',
        'Coupling methods'
      ],
      prerequisites: 'Probability, Linear Algebra, Graph Theory',
      applications: 'MCMC, PageRank, queueing, statistical mechanics'
    },
    'Monte Carlo': {
      description: 'Using random sampling to solve computational problems. Includes both simple Monte Carlo estimation and Markov chain Monte Carlo (MCMC) for sampling complex distributions.',
      keyElements: [
        'Monte Carlo integration',
        'Importance sampling',
        'Variance reduction techniques',
        'Metropolis-Hastings algorithm',
        'Gibbs sampling',
        'Convergence diagnostics',
        'Particle filters',
        'Simulated annealing'
      ],
      prerequisites: 'Probability, Markov Chains, Statistics',
      applications: 'Bayesian statistics, physics, finance, ML'
    },
    'Random Matrix Theory': {
      description: 'The study of matrices with random entries. Eigenvalue distributions show universal patterns appearing in number theory, physics, and statistics.',
      keyElements: [
        'Wigner semicircle law',
        'Marchenko-Pastur distribution',
        'Universality of eigenvalue statistics',
        'Tracy-Widom distribution',
        'Free probability',
        'Stieltjes transform',
        'Beta-ensembles',
        'Connections to Riemann zeta'
      ],
      prerequisites: 'Probability, Linear Algebra, Complex Analysis',
      applications: 'Statistics, physics, number theory, wireless communications'
    },
    'Ergodic Theory': {
      description: 'Long-term statistical behavior of dynamical systems. Studies when time averages equal space averages, connecting dynamics, measure theory, and probability.',
      keyElements: [
        'Measure-preserving transformations',
        'Ergodicity — time average = space average',
        'Birkhoff ergodic theorem',
        'Mixing properties',
        'Entropy (Kolmogorov-Sinai)',
        'Isomorphism of systems',
        'Bernoulli shifts',
        'Pointwise ergodic theorems'
      ],
      prerequisites: 'Measure Theory, Dynamical Systems, Probability',
      applications: 'Statistical mechanics, number theory, information theory'
    },
    'Numerical Analysis': {
      description: 'Algorithms for approximate computation. Studies how to solve mathematical problems on computers, analyzing stability, convergence, and cost.',
      keyElements: [
        'Floating-point arithmetic',
        'Root finding (Newton, bisection)',
        'Interpolation',
        'Numerical integration',
        'ODE solvers (Runge-Kutta)',
        'PDE discretization',
        'Error analysis',
        'Stability and conditioning'
      ],
      prerequisites: 'Linear Algebra, Real Analysis, ODEs, PDEs',
      applications: 'Scientific computing, engineering, finance'
    },
    'Numerical Linear Algebra': {
      description: 'Algorithms for linear algebra computations: solving systems, computing eigenvalues, matrix factorizations. The computational backbone of scientific computing.',
      keyElements: [
        'Gaussian elimination and LU factorization',
        'QR factorization',
        'SVD computation',
        'Eigenvalue algorithms (QR, power method)',
        'Iterative methods (CG, GMRES)',
        'Sparse matrix techniques',
        'Conditioning and stability',
        'Randomized algorithms'
      ],
      prerequisites: 'Linear Algebra, Numerical Analysis',
      applications: 'Scientific computing, data science, ML'
    },
    'Optimization': {
      description: 'Finding the best solution from a set of alternatives. Includes linear and nonlinear programming, convex optimization, and combinatorial optimization.',
      keyElements: [
        'Linear programming',
        'Simplex and interior point methods',
        'Convex optimization',
        'Gradient descent',
        'Lagrange multipliers and duality',
        'KKT conditions',
        'Combinatorial optimization',
        'Semidefinite programming'
      ],
      prerequisites: 'Linear Algebra, Real Analysis, Convex Geometry',
      applications: 'Machine learning, operations research, economics'
    },
    'Control Theory': {
      description: 'The mathematics of steering dynamical systems. Studies how to design inputs that drive systems to desired states.',
      keyElements: [
        'State-space models ẋ = Ax + Bu',
        'Controllability and observability',
        'Stability (Lyapunov methods)',
        'Feedback control',
        'PID controllers',
        'Optimal control',
        'Kalman filter',
        'Robust control'
      ],
      prerequisites: 'ODEs, Linear Algebra, Optimization',
      applications: 'Robotics, aerospace, process control'
    },
    'Dynamical Systems': {
      description: 'Systems evolving over time, especially their long-term behavior. Includes chaos theory, bifurcations, and qualitative analysis.',
      keyElements: [
        'Flows and maps',
        'Fixed points and stability',
        'Periodic orbits',
        'Bifurcations',
        'Chaos and strange attractors',
        'Lyapunov exponents',
        'Structural stability',
        'Invariant manifolds'
      ],
      prerequisites: 'ODEs, Topology, Measure Theory',
      applications: 'Physics, biology, climate, economics'
    },
    'Information Theory': {
      description: 'The mathematics of communication and compression. Defines entropy as the fundamental measure of information.',
      keyElements: [
        'Entropy H(X) = -Σp log p',
        'Mutual information',
        'Source coding theorem',
        'Channel capacity',
        'Noisy channel coding theorem',
        'Rate-distortion theory',
        'Kolmogorov complexity',
        'KL divergence'
      ],
      prerequisites: 'Probability, Coding Theory, Linear Algebra',
      applications: 'Communications, compression, ML, physics'
    },
    'Signal Processing': {
      description: 'Analysis and manipulation of signals: time series, images, audio. Combines harmonic analysis with practical algorithms.',
      keyElements: [
        'Fourier transform and FFT',
        'Sampling theorem',
        'Filtering',
        'Convolution',
        'Z-transform',
        'Wavelets',
        'Spectral estimation',
        'Compressed sensing'
      ],
      prerequisites: 'Harmonic Analysis, Linear Algebra, Probability',
      applications: 'Audio, image processing, communications'
    },
    'Cryptography': {
      description: 'The mathematics of secure communication. Uses number theory, algebra, and computational hardness for encryption and authentication.',
      keyElements: [
        'Symmetric encryption (AES)',
        'Public-key cryptography (RSA)',
        'Diffie-Hellman key exchange',
        'Elliptic curve cryptography',
        'Digital signatures',
        'Hash functions',
        'Zero-knowledge proofs',
        'Post-quantum cryptography'
      ],
      prerequisites: 'Number Theory, Group Theory, Computational Complexity',
      applications: 'Security, privacy, blockchain'
    },
    'Computational Complexity': {
      description: 'The inherent difficulty of computational problems. Classifies problems by resources needed, including the famous P vs NP question.',
      keyElements: [
        'Turing machines',
        'P and NP classes',
        'NP-completeness',
        'P vs NP problem',
        'Space complexity',
        'Randomized complexity (BPP)',
        'Circuit complexity',
        'Interactive proofs'
      ],
      prerequisites: 'Logic, Computability, Combinatorics, Boolean Functions',
      applications: 'Algorithm design, cryptography'
    },
    'Machine Learning': {
      description: 'Algorithms that learn from data. Combines optimization, statistics, and linear algebra to build systems that improve with experience.',
      keyElements: [
        'Supervised vs unsupervised learning',
        'Loss functions and ERM',
        'Gradient descent and backprop',
        'Regularization',
        'Neural networks',
        'Kernel methods',
        'Bias-variance tradeoff',
        'Generalization bounds'
      ],
      prerequisites: 'Statistics, Optimization, Linear Algebra, Probability',
      applications: 'Vision, NLP, recommendation, science'
    },
    'Game Theory': {
      description: 'Mathematics of strategic interaction. Studies situations where outcomes depend on choices of multiple agents.',
      keyElements: [
        'Normal form games',
        'Nash equilibrium',
        'Dominant strategies',
        'Mixed strategies',
        'Extensive form games',
        'Cooperative games',
        'Mechanism design',
        'Evolutionary game theory'
      ],
      prerequisites: 'Probability, Optimization, Linear Algebra',
      applications: 'Economics, political science, biology, CS'
    },
    'Mathematical Finance': {
      description: 'Mathematics for financial markets. Uses stochastic processes and PDEs for pricing, risk management, and portfolio optimization.',
      keyElements: [
        'Black-Scholes model',
        'Option pricing',
        'Risk-neutral valuation',
        'Greeks (delta, gamma, etc.)',
        'Interest rate models',
        'Portfolio optimization',
        'Value at Risk',
        'Credit risk'
      ],
      prerequisites: 'Stochastic Processes, PDEs, Optimization',
      applications: 'Trading, risk management, insurance'
    },
    'Inverse Problems': {
      description: 'Recovering causes from effects. Given observations y = A(x) + noise, find x. Fundamental in imaging, geophysics, and medicine.',
      keyElements: [
        'Well-posed vs ill-posed problems',
        'Regularization methods',
        'Tikhonov regularization',
        'Truncated SVD',
        'Iterative methods',
        'Bayesian approach',
        'Sparsity and compressed sensing',
        'Stability estimates'
      ],
      prerequisites: 'Functional Analysis, PDEs, Numerical Analysis',
      applications: 'Medical imaging, geophysics, remote sensing'
    },
    'Computational Geometry': {
      description: 'Algorithms for geometric problems. Studies efficient computation of geometric structures and their properties.',
      keyElements: [
        'Convex hulls',
        'Voronoi diagrams',
        'Delaunay triangulation',
        'Line segment intersection',
        'Point location',
        'Range searching',
        'Motion planning',
        'Geometric data structures'
      ],
      prerequisites: 'Discrete Geometry, Combinatorics, Graph Theory',
      applications: 'Computer graphics, robotics, GIS'
    },
    'Mathematical Physics': {
      description: 'Rigorous mathematical foundations of physics. Studies structures (geometry, analysis, algebra) underlying physical theories.',
      keyElements: [
        'Lagrangian and Hamiltonian mechanics',
        'Symplectic geometry of phase space',
        'Hilbert space quantum mechanics',
        'Spectral theory',
        'Gauge theory and fiber bundles',
        'Representation theory of symmetries',
        'Rigorous statistical mechanics',
        'Constructive QFT'
      ],
      prerequisites: 'Differential Geometry, Functional Analysis, Lie Theory, PDEs',
      applications: 'Understanding and developing physics'
    },
    'Quantum Mechanics': {
      description: 'Physics of the microscopic world in Hilbert space language. States are vectors, observables are operators, measurement is projection.',
      keyElements: [
        'Hilbert space formulation',
        'Observables as self-adjoint operators',
        'Schrödinger equation',
        'Born rule for probabilities',
        'Uncertainty principle',
        'Spin and angular momentum',
        'Tensor products for composite systems',
        'Entanglement'
      ],
      prerequisites: 'Functional Analysis, Linear Algebra, Representation Theory',
      applications: 'Atomic physics, chemistry, quantum computing'
    },
    'Classical Mechanics': {
      description: 'Macroscopic motion via symplectic geometry. Lagrangian and Hamiltonian formulations reveal deep geometry-symmetry connections.',
      keyElements: [
        'Lagrangian L = T - V',
        'Euler-Lagrange equations',
        'Hamiltonian H, phase space',
        'Hamilton\'s equations',
        'Poisson brackets',
        'Canonical transformations',
        'Noether\'s theorem',
        'Hamilton-Jacobi theory'
      ],
      prerequisites: 'Symplectic Geometry, Calculus of Variations, ODEs',
      applications: 'Celestial mechanics, robotics'
    },
    'Relativity': {
      description: 'Einstein\'s theories of space, time, and gravity. Special relativity unifies space-time; general relativity describes gravity as curvature.',
      keyElements: [
        'Lorentz transformations',
        'Minkowski spacetime',
        'Four-vectors and tensors',
        'Gravity as curvature',
        'Einstein field equations',
        'Geodesics and free fall',
        'Black holes',
        'Gravitational waves'
      ],
      prerequisites: 'Riemannian Geometry, Differential Geometry, PDEs',
      applications: 'GPS, cosmology, gravitational wave detection'
    },
    'QFT': {
      description: 'Quantum mechanics + special relativity + fields. Particles are excitations of quantum fields. Framework for particle physics.',
      keyElements: [
        'Fields as operator-valued distributions',
        'Creation/annihilation operators',
        'Fock space',
        'Feynman diagrams',
        'Renormalization',
        'Gauge theories',
        'Standard Model',
        'Anomalies and topology'
      ],
      prerequisites: 'Functional Analysis, Representation Theory, Differential Geometry, Probability',
      applications: 'Particle physics, condensed matter'
    },
    'Langlands Program': {
      description: 'Grand unification connecting number theory, representation theory, and geometry. Perhaps the deepest vision in contemporary mathematics.',
      keyElements: [
        'Automorphic forms',
        'Galois representations',
        'L-functions',
        'Langlands correspondence',
        'Functoriality',
        'Geometric Langlands',
        'p-adic Langlands',
        'Trace formula'
      ],
      prerequisites: 'Representation Theory, Algebraic NT, Algebraic Geometry, Harmonic Analysis',
      applications: 'Number theory, physics (S-duality)'
    }
  };

  // Build adjacency for influence propagation
  const adjacency = React.useMemo(() => {
    const adj = {};
    Object.keys(nodes).forEach(n => { adj[n] = { parents: [], children: [] }; });
    edges.forEach(([from, to, strength]) => {
      if (adj[to]) adj[to].children.push(from);
      if (adj[from]) adj[from].parents.push(to);
    });
    return adj;
  }, []);

  const getInfluencedNodes = (nodeName) => {
    const influenced = new Set();
    const queue = [nodeName];
    while (queue.length > 0) {
      const current = queue.shift();
      if (adjacency[current]) {
        adjacency[current].children.forEach(child => {
          if (!influenced.has(child)) {
            influenced.add(child);
            queue.push(child);
          }
        });
      }
    }
    return influenced;
  };

  const getConnectedNodes = (nodeName) => {
    const connected = new Set();
    edges.forEach(([from, to]) => {
      if (from === nodeName) connected.add(to);
      if (to === nodeName) connected.add(from);
    });
    return connected;
  };

  const activeNode = hoveredNode || selectedNode;
  const connectedNodes = activeNode ? getConnectedNodes(activeNode) : new Set();
  const influencedNodes = (activeNode && showInfluence) ? getInfluencedNodes(activeNode) : new Set();

  const getEdgeOpacity = (from, to) => {
    if (!activeNode && !showAllEdges) return 0.1;
    if (!activeNode && showAllEdges) return 0.3;
    
    if (showInfluence && activeNode) {
      if (influencedNodes.has(from) && influencedNodes.has(to)) return 0.6;
      if (from === activeNode && influencedNodes.has(to)) return 0.8;
      if (to === activeNode && influencedNodes.has(from)) return 0.8;
      return 0.03;
    }
    
    if (from === activeNode || to === activeNode) return 0.8;
    return 0.03;
  };

  const getNodeOpacity = (name) => {
    if (!activeNode) return 1;
    if (showInfluence) {
      if (name === activeNode || influencedNodes.has(name)) return 1;
      return 0.12;
    }
    if (name === activeNode || connectedNodes.has(name)) return 1;
    return 0.15;
  };

  const getEdgeWidth = (strength) => strength === 3 ? 2 : strength === 2 ? 1.2 : 0.8;
  
  const getEdgeColor = (from, to) => {
    if (showInfluence && activeNode && (from === activeNode || influencedNodes.has(from))) {
      return '#fbbf24';
    }
    return '#64748b';
  };

  const categoryColors = {
    'Foundations': '#64748b',
    'Algebra': '#3b82f6',
    'Analysis': '#10b981',
    'Geometry': '#a855f7',
    'Number Theory': '#f59e0b',
    'Combinatorics': '#ec4899',
    'Probability': '#06b6d4',
    'Applied': '#f97316',
    'Physics': '#ef4444',
    'Unification': '#8b5cf6',
  };

  const importantNodes = ['Linear Algebra', 'Functional Analysis', 'Algebraic Geometry', 'Mathematical Physics', 'Set Theory', 'Category Theory', 'Probability', 'Combinatorics'];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-3 overflow-x-auto">
      <h1 className="text-2xl font-bold text-center mb-1">The Rhizome of Mathematics</h1>
      <p className="text-slate-400 text-center text-sm mb-2">
        Click nodes for detailed descriptions. Toggle "Influence Flow" to see dependencies cascade.
      </p>
      
      <div className="flex justify-center gap-3 mb-2 flex-wrap">
        <button
          onClick={() => setShowAllEdges(!showAllEdges)}
          className={`px-3 py-1 rounded text-sm ${showAllEdges ? 'bg-blue-600' : 'bg-slate-700'}`}
        >
          {showAllEdges ? 'All Edges: ON' : 'All Edges: OFF'}
        </button>
        <button
          onClick={() => setShowInfluence(!showInfluence)}
          className={`px-3 py-1 rounded text-sm ${showInfluence ? 'bg-amber-600' : 'bg-slate-700'}`}
        >
          {showInfluence ? 'Influence Flow: ON' : 'Influence Flow: OFF'}
        </button>
        <button
          onClick={() => { setSelectedNode(null); setHoveredNode(null); }}
          className="px-3 py-1 rounded text-sm bg-slate-700"
        >
          Reset
        </button>
      </div>
      
      <div className="flex justify-center gap-4">
        <svg width="1100" height="820" className="border border-slate-700 rounded-lg bg-slate-950">
          {/* Edges */}
          {edges.map(([from, to, strength], i) => {
            const fromNode = nodes[from];
            const toNode = nodes[to];
            if (!fromNode || !toNode) return null;
            
            return (
              <line
                key={i}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={getEdgeColor(from, to)}
                strokeWidth={getEdgeWidth(strength)}
                opacity={getEdgeOpacity(from, to)}
                className="transition-all duration-200"
              />
            );
          })}
          
          {/* Nodes */}
          {Object.entries(nodes).map(([name, { x, y, color, category }]) => {
            const isImportant = importantNodes.includes(name);
            const radius = isImportant ? 18 : 14;
            
            return (
              <g
                key={name}
                transform={`translate(${x}, ${y})`}
                onClick={() => setSelectedNode(selectedNode === name ? null : name)}
                onMouseEnter={() => setHoveredNode(name)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer', opacity: getNodeOpacity(name) }}
                className="transition-opacity duration-200"
              >
                <circle
                  r={radius}
                  fill={color}
                  stroke={activeNode === name ? '#fff' : (showInfluence && influencedNodes.has(name) ? '#fbbf24' : 'transparent')}
                  strokeWidth={2}
                />
                <text
                  textAnchor="middle"
                  dy=".3em"
                  fill="white"
                  fontSize={name.length > 16 ? "8" : name.length > 12 ? "9" : "10"}
                  fontWeight="500"
                >
                  {name.length > 20 ? name.substring(0, 18) + '..' : name}
                </text>
              </g>
            );
          })}
          
        </svg>
        
        {/* Categories Legend - moved outside SVG */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700" style={{minWidth: '150px'}}>
          <h3 className="text-slate-300 font-bold text-sm mb-3">Categories</h3>
          <div className="space-y-2">
            {Object.entries(categoryColors).map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: color}}></div>
                <span className="text-slate-400 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Detailed Description Panel */}
      {selectedNode && fieldDetails[selectedNode] && (
        <div className="max-w-4xl mx-auto mt-4 p-5 bg-slate-800 rounded-lg border border-slate-600">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: nodes[selectedNode]?.color }}
            />
            <h2 className="text-xl font-bold">{selectedNode}</h2>
            <span className="text-sm text-slate-400">({nodes[selectedNode]?.category})</span>
          </div>
          
          <p className="text-slate-300 mb-4 leading-relaxed">
            {fieldDetails[selectedNode].description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-300 mb-2">Key Elements</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                {fieldDetails[selectedNode].keyElements.map((element, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{element}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-green-300 mb-2">Prerequisites</h3>
                <p className="text-sm text-slate-300">{fieldDetails[selectedNode].prerequisites}</p>
              </div>
              
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-amber-300 mb-2">Applications</h3>
                <p className="text-sm text-slate-300">{fieldDetails[selectedNode].applications}</p>
              </div>
              
              {showInfluence && influencedNodes.size > 0 && (
                <div className="bg-amber-900/30 rounded-lg p-4 border border-amber-700">
                  <h3 className="font-semibold text-amber-300 mb-2">Influences ({influencedNodes.size} fields)</h3>
                  <p className="text-sm text-slate-300">
                    {[...influencedNodes].slice(0, 10).join(', ')}{influencedNodes.size > 10 ? '...' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-600">
            <h3 className="font-semibold text-slate-400 mb-2">Direct Connections</h3>
            <div className="flex flex-wrap gap-2">
              {[...connectedNodes].map(node => (
                <button
                  key={node}
                  onClick={() => setSelectedNode(node)}
                  className="px-2 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600 transition-colors"
                  style={{ borderLeft: `3px solid ${nodes[node]?.color}` }}
                >
                  {node}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {!selectedNode && (
        <div className="max-w-2xl mx-auto mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-center">
          <p className="text-slate-400">
            👆 Click any node to see its description, key elements, and applications.
          </p>
        </div>
      )}
      
      <p className="text-center text-slate-500 text-xs mt-4">
        Now with {Object.keys(nodes).length} fields across {Object.keys(categoryColors).length} categories.
      </p>
    </div>
  );
};
