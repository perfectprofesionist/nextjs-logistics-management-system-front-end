import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    console.log('hi');
    
    const token = req.cookies.get('access_token')?.value;
    const isLoginPage = req.nextUrl.pathname === '/admin/login';

    if ((!token || token.trim() === '') && !isLoginPage) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = '/admin/login';
        loginUrl.search = '';
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Exclude /auth/login, _next/static, _next/image, favicon.ico
        '/((?!admin/login|_next/static|_next/image|favicon.ico).*)',
    ],
}
