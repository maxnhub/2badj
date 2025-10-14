const chaptersData = [
    {
        id: 1,
        title: 'Introduction to DJing',
        Lessons: [
            {
                id: 1,
                title: 'Getting Started with Rekordbox',
                content: `
            <h3>What is Rekordbox?</h3>
            <p>Professional software from Pioneer DJ for music organization and preparation. Key features:</p>
            <ul>
              <li>Track analysis (BPM, key)</li>
              <li>Setting cue points and loops</li>
              <li>Export to USB for CDJ/XDJ</li>
              <li>Performance mode for live mixing</li>
            </ul>
            <h3>How to start?</h3>
            <ol>
              <li>Download from the <a href="https://rekordbox.com/" target="_blank">official website</a></li>
              <li>Add music to the library</li>
              <li>Mark tracks (cue points, loops)</li>
            </ol>
          `,
                audioExample: '/audio/rekordbox-intro.mp3',
            },
            {
                id: 2,
                title: 'Track Preparation',
                content: `
            <h3>Hotkeys for work:</h3>
            <div class="shortcuts-grid">
              <div><kbd>C</kbd> - Add cue point</div>
              <div><kbd>Space</kbd> - Play/pause</div>
              <div><kbd>B</kbd> - Set loop</div>
            </div>
            <h3>Tips for beginners:</h3>
            <ul>
              <li>Always verify automatically detected BPM</li>
              <li>Mark track structure (intro, drop, outro)</li>
              <li>Use color tags for organization</li>
            </ul>
          `,
                audioExample: '/audio/track-preparation.mp3',
            },
            {
                id: 3,
                title: 'Export to USB',
                content: `
            <h3>For club performances:</h3>
            <ol>
              <li>Insert USB flash drive</li>
              <li>Switch to <strong>Export Mode</strong></li>
              <li>Transfer playlists to the device</li>
            </ol>
            <div class="note">
              <p>Format the USB in FAT32 for CDJ compatibility!</p>
            </div>
          `,
                audioExample: '/audio/usb-export.mp3',
            },
        ],
    },
    {
        id: 2,
        title: 'Hardware Setup',
        Lessons: [
            {
                id: 4,
                title: 'DDJ-400: First Look',
                content: `
            <h3>Entry-level controller for beginners</h3>
            <div class="controller-layout">
              <div class="controller-images">
                <img src="https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-400sxa/ddj-400_cgi_top_1792x1316.jpg" alt="DDJ-400 Top View" class="lesson-image">
                <img src="https://www.pioneerdj.com/-/media/pioneerdj/images/products/controller/ddj-400sxa/ddj-400_cgi_rear_1792x1316.jpg?dmc=1.jpg" alt="DDJ-400 Rear View" class="lesson-image">
              </div>
              <div class="features">
                <h4>Key components:</h4>
                <ul>
                  <li><strong>Jog wheels</strong> - for scratching and seeking</li>
                  <li><strong>Faders</strong> - volume control</li>
                  <li><strong>Effects</strong> - built-in processors</li>
                  <li><strong>Hot Cue buttons</strong> - quick access</li>
                </ul>
              </div>
            </div>
          `,
                audioExample: '/audio/ddj-intro.mp3',
            },
            {
                id: 5,
                title: 'Connecting the DDJ-400',
                content: `
            <h3>Step-by-step guide:</h3>
            <ol>
              <li>Install drivers from the <a href="https://www.pioneerdj.com/" target="_blank">official website</a></li>
              <li>Connect the controller via USB</li>
              <li>Launch Rekordbox and select DDJ-400</li>
            </ol>
          `,
                audioExample: '/audio/ddj-connect.mp3',
            },
        ],
    },
    {
        id: 3,
        title: 'Mixing Techniques',
        Lessons: [
            {
                id: 6,
                title: 'Basic Mixing on the DDJ-400',
                content: `
                    <h3>Techniques for Beginners:</h3>
                    <div class="mixing-techniques">
                        <div class="technique">
                            <h4>1. Beat Matching</h4>
                            <p>Matching the BPM of Two Tracks Using Jog Wheels</p>
                        </div>
                    <div class="technique">
                        <h4>2. Fader Mixing</h4>
                        <p>Fade Between Channels</p>
                    </div>
                    <div class="technique">
                        <h4>3. Using Effects</h4>
                        <p>Adding Filters and Echo</p>
                    </div>
                    </div>
                    <div class="video-wrapper">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/4g0tOBQJ6M4?si=B1U6K0P17Fv8SAne" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div class="interactive-section">
                        <h4>🎯 Practice online!</h4>
                        <p>Use our interactive trainer to practice beat matching:</p>
                        <button onclick="window.openBeatMatchingTrainer()" class="interactive-btn">
                            Open Beat Matching Trainer
                    </button>
                    </div>
        `,
                audioExample: '/audio/mixing-basics.mp3',
            },
            {
                id: 7,
                title: 'Controls Layout',
                content: `
        <h3>Control Layout:</h3>
        <div class="controller-layout">
        <div class="features">
        <h4>Main Elements:</h4>
        <ul>
        <li><strong>Pitch Fader</strong>: Adjust the track tempo</li>
        <img src="https://i.ytimg.com/vi/TPv-DYkUUrg/sddefault.jpg" alt="Adjust the track tempo" class="lesson-image">
        <li><strong>Cue Buttons</strong>: Quick navigation cues</li>
        <img src="https://i.ytimg.com/vi/OffmOKo7Oy8/maxresdefault.jpg" alt="Hot keys" class="lesson-image">
        <li><strong>Loop Controls</strong>: Create and manage loops</li>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfKcVjCAeIyd4chtD4CrAQWsh4WdMWHKCNQ&s.jpg" alt="Creating and Managing Loops" class="lesson-image">
        </ul>
        </div>
        </div>
        `,
                audioExample: '/audio/control-layout.mp3',
            },
            {
                id: 8,
                title: 'EQ Mixing',
                content: `
        <h3>Working with the equalizer:</h3>
        <p>The equalizer allows you to adjust frequencies (low, mid, high) for smooth transitions.</p>
        <ul>
        <li><strong>Low EQ</strong>: Bass control (remove the lows on one track when mixing)</li>
        <li><strong>Mid EQ</strong>: Mid frequencies for vocals and instruments</li>
        <li><strong>High EQ</strong>: High frequencies for clarity</li>
        </ul>
        <div class="video-wrapper">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/-jRCizG7Ito?si=J4UN62bo9RRb_Dob" title="EQ Mixing" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        `,
                audioExample: '/audio/eq-mixing.mp3',
            },
            {
                id: 9,
                title: 'Looping Techniques',
                content: `
        <h3>Creating and using loops:</h3>
        <p>Loops allow you to repeat a section of a track to create effects or transitions.</p>
        <ul>
        <li><strong>Auto Loop</strong>: Automatically create loops (4, 8, 16 beats)</li>
        <img src="https://www.knightsoundandlight.com/cdn/shop/products/589DDJFLX46_1024x1024@2x.jpg?v=1667927220.jpg" alt="Auto Loop" class="lesson-image">
        <li><strong>Manual Loop</strong>: Manually adjust the start and end</li>
        <img src="https://djtechzone.com/wp-content/uploads/2019/07/pioneer-dj-ddj-800-looping-section.jpg" alt="Manual Loop" class="lesson-image">
        <li><strong>Loop Exit</strong>: Exit the loop to continue the track</li>
        <img src="https://wearecrossfader.co.uk/wp-content/uploads/2024/02/flx4-loop-wordpress-thumb.jpg" alt="Loop Exit" class="lesson-image">
        </ul>
        <div class="note">
        <p>Use loops to extend intros or create unique transitions!</p>
        </div>
        `,
                audioExample: '/audio/looping.mp3',
            },
            {
                id: 10,
                title: 'Using Effects',
                content: `
            <h3>Adding Effects:</h3>
            <p>Effects add dynamics and variety to a mix.</p>
            <div class="mixing-techniques">
            <div class="technique">
            <h4>1. Filter</h4>
            <p>Adds or subtracts frequencies to create transitions</p>
            </div>
            <div class="technique">
            <h4>2. Echo</h4>
            <p>Creates an echo effect for dramatic transitions</p>
            </div>
            <div class="technique">
            <h4>3. Reverb</h4> 
            <p>Adds a spatial effect</p> 
            </div> 
            </div> 
            <div class="video-wrapper"> 
            <iframe width="560" height="315" src="https://www.youtube.com/embed/5QzL0YOtMhY?si=7Y8zX9kL2mN6Y7ZQ" title="Effects Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 
            </div> 
            `,
                audioExample: '/audio/effects.mp3',
            },
        ],
    },
    {
        id: 4,
        title: 'Advanced Mixing Techniques',
        Lessons: [
            {
                id: 11,
                title: 'Basics of Beat-to-Bit Mixing',
                content: `
            <h3>Bit-to-Bit Mixing</h3>
            <p>In 99% of cases, tracks are mixed "beat-to-beat" - this means that the kick drum hits of one track match the kick drum hits of another track on the strong beat. This creates a smooth, natural transition between tracks.</p>
            <ul>
            <li><strong>Beat</strong>: A single kick drum hit or a series of hits that form a rhythm.</li>
            <li><strong>Bar</strong>: Four beats that form a musical phrase.</li>
            <li>For precise mixing, use the <strong>Pitch Fader</strong> on your controller to sync the BPM.</li>
            </ul>
            <h3>How to get the perfect mix?</h3>
            <ol>
            <li>Turn on <strong>Beat Grid</strong> in Rekordbox for a visual reference.</li>
            <img src="https://cdn.prod.website-files.com/5abf6872d0f264292bfb1c2d/6760aa73b5c684061dd156f9_6760a394b4acb4a80755b4cc_Corret%2520Beatgrid.jpeg" alt="Rekordbox Beat Grid" class="lesson-image">
            <li>Listen tracks in headphones and adjust the tempo of the second track.</li>
            <li>Use the jog wheels to sync the beats precisely.</li>
            </ol>
            <div class="note">
            <p>Always check the automatically arranged Beat Grid in Rekordbox, as it may not be accurate!</p>
            </div>
            <div class="video-wrapper">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/4g0tOBQJ6M4?si=B1U6K0P17Fv8SAne" title="Beat Matching Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            `,
                audioExample: '/audio/beat-matching.mp3',
            },
            {
                id: 12,
                title: 'Mixing tracks with different BPMs',
                content: `
                <h3>Working with different tempos</h3>
                <p>Mixing tracks with different BPMs requires additional techniques to ensure the transition remains smooth. This is especially true for genres with large differences in tempo, such as RnB (80-100 BPM) and House (120-130 BPM).</p>
                <ul>
                <li><strong>Smooth tempo changes</strong>: Gradually increase or decrease the BPM of the first track using the Pitch Fader.</li>
                <li><strong>Using loops</strong>: Create a loop in the slower track to mask the transition.</li>
                <li><strong>Effects</strong>: Apply filters or echo to smooth out tempo changes.</li>
                </ul>
                <h3>Example on a Pioneer CDJ-3000</h3>
                <div class="controller-images">
                <img src="https://store.djtechtools.com/cdn/shop/files/PioneerDJM-A9CDJ-3000Bundle.jpg?v=1691703142&width=3840" alt="Pioneer CDJ-3000" class="lesson-image">
                </div>
                <ol>
                <li>Load tracks with different BPMs (e.g. 87 and 126 BPM).</li>
                <li>Use <strong>Auto Loop</strong> to create a 4-beat loop on a slow track.</li>
                <li>Gradually increase the tempo until it matches the tempo of the second track.</li>
                </ol>
                <div class="video-wrapper">
                <iframe width="560" height="315" src="https://youtu.be/b-JtZrj_ftc?si=Mbn1wp9xWu1v-ghN" title="Mixing Different BPMs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                `,
                audioExample: '/audio/mixing-bpm.mp3',
            },
            {
                id: 13,
                title: 'Creative Mixing Techniques',
                content: `
                <h3>Creating a Unique Sound</h3>
                <p>In 1% of cases, DJs intentionally shift beats to create a unique sound. This is great for experimental mixes or genres where unconventional transitions are acceptable.</p>
                <ul>
                <li><strong>Beat Shift</strong>: Shift the beat of the second track forward or backward to create a new rhythmic pattern.</li>
                <li><strong>Hot Cues</strong>: Use cue points to quickly jump to specific parts of a track.</li>
                <li><strong>Transition FX</strong>: Apply filters, echo, or reverb for dramatic transitions.</li>
                </ul>
                <h3>Creative Mix Example</h3>
                <div class="controller-images">
                <img src="https://www.pioneerdj.com/-/media/pioneerdj/images/products/mixer/djm-900nxs2/djm-900nxs2_hero_1792x1316.jpg" alt="Pioneer DJM-900NXS2" class="lesson-image">
                </div>
                <ol>
                <li>Set a cue point on the drop of the second track.</li>
                <li>Apply an echo effect on the last bar of the first track.</li>
                <li>Shift the beat of the second track by half a beat for a unique effect.</li>
                </ol>
                <div class="note">
                <p>Experiment with creative mixing only after mastering the basic techniques!</p>
                </div>
                `,
                audioExample: '/audio/creative-mixing.mp3',
            },
            {
              id: 14,
              title: 'Mixing with the Camelot Wheel',
              content: `
                  <h3>Introduction to the Camelot Wheel</h3>
                  <p>The Camelot Wheel is a system for harmonic mixing that helps DJs mix tracks in compatible keys for smoother transitions.</p>
                  
                  <div class="camelot-wheel">
                      <img src="https://zwook.ru/uploads/common/camelotcircle-cuatripatipedo.jpg" alt="Camelot Wheel" class="lesson-image">
                  </div>
                  
                  <h3>How it works:</h3>
                  <ul>
                      <li><strong>Keys are represented as codes</strong> (e.g., 1A, 2B, 3A)</li>
                      <li><strong>Same code</strong>: Perfect harmonic match</li>
                      <li><strong>Adjacent codes</strong> (e.g., 1A → 2A or 1A → 1B): Good match</li>
                      <li><strong>+/- 7</strong>: Relative minor/major match</li>
                  </ul>
                  
                  <h3>Practical usage in Rekordbox:</h3>
                  <ol>
                      <li>Analyze tracks to detect key</li>
                      <li>Sort your playlist by key using the Camelot system</li>
                      <li>Choose tracks with compatible keys for seamless mixing</li>
                  </ol>
                  
                  <div class="note">
                      <p>Harmonic mixing can make your sets sound more professional and musically coherent!</p>
                  </div>
                  
                  <div class="video-wrapper">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/-PwD6UyT9y4?si=eVGaKRNh5-pWB2r1" title="Camelot Wheel Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  </div>
              `,
              audioExample: '/audio/camelot-wheel.mp3',
            },
            {
              id: 15,
              title: 'Advanced Harmonic Mixing Techniques',
              content: `
                  <h3>Beyond Basic Camelot Mixing</h3>
                  <p>Once you master basic harmonic mixing, you can explore more advanced techniques for creative transitions.</p>
                  
                  <h3>Advanced Camelot transitions:</h3>
                  <ul>
                      <li><strong>Energy boosting</strong>: Move clockwise around the wheel (e.g., 1A → 2A → 3A) to gradually increase energy</li>
                      <li><strong>Energy reducing</strong>: Move counterclockwise (e.g., 5A → 4A → 3A) for smoother energy drops</li>
                      <li><strong>Modal mixture</strong>: Jump between relative major/minor keys (e.g., 1A ↔ 1B)</li>
                      <li><strong>+6/-6 jumps</strong>: Create dramatic key changes for impactful moments</li>
                  </ul>
                  
                  <h3>Practical example for a build-up:</h3>
                  <ol>
                      <li>Start at 8A (C minor) - intro section</li>
                      <li>Move to 9A (D♭ minor) - build tension</li>
                      <li>Transition to 10A (D minor) - peak energy</li>
                      <li>Drop at 11A (E♭ minor) - main section</li>
                  </ol>
                  
                  <div class="note">
                      <p>Use these techniques to create emotional journeys in your sets!</p>
                  </div>
              `,
              audioExample: '/audio/advanced-harmonic.mp3',
            },
            {
              id: 16,
              title: 'Camelot Wheel in Practice: Genre-Specific Approaches',
              content: `
                  <h3>Applying Harmonic Mixing to Different Genres</h3>
                  <p>Different music genres benefit from different harmonic mixing approaches.</p>
                  
                  <h3>Genre-specific strategies:</h3>
                  
                  <div class="mixing-techniques">
                      <div class="technique">
                          <h4>House/Techno</h4>
                          <p>Stick to adjacent keys for seamless, long mixes. Perfect for maintaining energy on the dancefloor.</p>
                      </div>
                      <div class="technique">
                          <h4>Hip-Hop/R&B</h4>
                          <p>Use relative major/minor shifts (same number, different letter) for emotional contrast.</p>
                      </div>
                      <div class="technique">
                          <h4>Progressive/Trance</h4>
                          <p>Employ +1/+2 steps for gradual energy builds across multiple tracks.</p>
                      </div>
                  </div>
                  
                  <h3>Setting up Rekordbox for harmonic mixing:</h3>
                  <ol>
                      <li>Enable Camelot key display in preferences</li>
                      <li>Create smart playlists grouped by key</li>
                      <li>Use the related tracks feature to find compatible options</li>
                  </ol>
                  
                  <div class="video-wrapper">
                      <iframe width="560" height="315" src="https://www.youtube.com/embed/VOcEyIFFYxM?si=Cdzgq18racQaWDLT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                  </div>
              `,
              audioExample: '/audio/genre-harmonic.mp3',
            }
        ],
    },
];

module.exports = chaptersData;