/*
 * Copyright 2026 Humilitas Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The NFP was renamed: Justack Foundation → Justack Centre for Law & Technology
        source: "/foundation",
        destination: "/centre",
        permanent: true,
      },
      {
        // Cover old sub-paths too (e.g. hot-linked /foundation/scene-*.jpg images)
        source: "/foundation/:path*",
        destination: "/centre/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
