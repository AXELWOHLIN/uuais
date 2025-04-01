import Image from 'next/image';

const founders = [
  {
    name: 'AXEL WOHLIN',
    image: '/images/logo.png',
    linkedin: 'https://www.linkedin.com/in/axel-wohlin-6a000a164/',
    github: 'https://github.com/AXELWOHLIN'
  },
  {
    name: 'NILS SKOOG',
    image: '/images/logo.png',
    linkedin: 'https://www.linkedin.com/in/axel-wohlin-6a000a164/',
    github: 'https://github.com/AXELWOHLIN'
  },
  {
    name: 'ALEXANDER SUNDQUIST',
    image: '/images/logo.png',
    linkedin: 'https://www.linkedin.com/in/axel-wohlin-6a000a164/',
    github: 'https://github.com/AXELWOHLIN'
  }
];

const FoundersSection = () => {
  return (
    <section id="application" className="py-16 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-3">SEEKING FOUNDING MEMBERS</h2>
          <p className="text-base text-white/80">
            Email applications to{' '}
            <a href="mailto:president@uuai.se" className="text-[#c8102e] hover:underline">
              president@uuai.se
            </a>
          </p>
          <p className="text-base text-white/80 mt-2">Include your coolest project!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10"
            >
              <div className="relative w-24 h-24 mx-auto mb-3">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="rounded-full object-cover grayscale"
                />
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-3">{founder.name}</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:text-[#c8102e] transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={founder.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:text-[#c8102e] transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection; 