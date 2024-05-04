/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;



////This is composition fun


function a(func) {
  return function (...arg) {
    return func.apply(arg);
  }
}
