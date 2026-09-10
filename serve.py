"""
VectorGuard - Local Development Server Launcher
Smart India Hackathon 2026 | Team: VectorGuard
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

# Ensure working directory is the script directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable aggressive caching for live preview
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("  VECTORGUARD - SIH 2026 PLATFORM LOCAL SERVER")
        print("  Problem Statement: SIH26200 | Team: VectorGuard")
        print(f"  Server Running at: {url}")
        print("=" * 60)
        print("  Opening browser...")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        print("  Press Ctrl+C to stop the server.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Server stopped cleanly.")

if __name__ == "__main__":
    start_server()
