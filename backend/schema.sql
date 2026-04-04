-- 1. Create Tables
CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    image_url TEXT,
    manifesto TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    voter_email VARCHAR(255) NOT NULL,
    candidate_id INTEGER REFERENCES candidates(id),
    position VARCHAR(255) NOT NULL,
    casted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(voter_email, position)
);

-- 2. Indexes for Production Performance
CREATE INDEX IF NOT EXISTS idx_votes_candidate ON votes(candidate_id);
CREATE INDEX IF NOT EXISTS idx_votes_position ON votes(position);
CREATE INDEX IF NOT EXISTS idx_candidates_position ON candidates(position);

-- 3. Insert Sample Candidates (You can change these)
INSERT INTO candidates (name, position, image_url, manifesto) VALUES 
('Alex Johnson', 'Chairperson', 'https://i.pravatar.cc/150?u=alex', 'Promoting tech innovation and inclusivity.'),
('Sarah Williams', 'Chairperson', 'https://i.pravatar.cc/150?u=sarah', 'Bridging the gap between students and industry.'),
('Kelvin Mwaniki', 'Organizing Secretary', 'https://i.pravatar.cc/150?u=kelvin', 'Modernizing association events and workshops.');
