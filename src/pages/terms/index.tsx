import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../assets/home-image-1.png";

const Terms = () => {
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] h-[100vh] flex">
      <div className="bg-black w-1/2 flex justify-center items-center">
        <img src={img1} alt="" className="w-[500px] mx-auto mt-[30px]" />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-2/3 h-[80vh] border py-[10px] px-[40px] rounded-md overflow-y-scroll">
          <h1 className="font-medium text-[17px] mt-[10px]">
            Terms and Conditions
          </h1>
          <div className="mt-[10px]">
            <p className="mt-[20px]">1. Introduction</p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - By downloading or using this application, you agree to comply
              with and be bound by these terms and conditions.
            </p>

            <p className="mt-[20px]">2. Use of the Application</p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - You must not use the application for any illegal activities or
              in violation of any laws.
            </p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account.
            </p>

            <p className="mt-[20px]">3. Intellectual Property</p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - All content included in the application, such as text, graphics,
              logos, and images, is the property of the application owner and is
              protected by applicable copyright and trademark laws.
            </p>

            <p className="mt-[20px]">4. User-Generated Content</p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - You may be able to create or upload content to the application.
              You retain ownership of any intellectual property rights that you
              hold in that content.
            </p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - By submitting content, you grant the application a worldwide,
              non-exclusive, royalty-free license to use, reproduce, and
              distribute your content.
            </p>

            <p className="mt-[20px]">5. Privacy Policy</p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - Your use of the application is also governed by our Privacy
              Policy, which outlines how we collect, use, and protect your
              information.
            </p>

            <p className="mt-[20px]">6. Termination</p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - We reserve the right to terminate or suspend your access to the
              application at any time, without notice, for conduct that we
              believe violates these terms and conditions or is harmful to other
              users of the application.
            </p>

            <p className="mt-[20px]">7. Updates to the Application</p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - We may from time to time provide updates to the application.
              These updates are designed to improve, enhance, and further
              develop the application and may take the form of bug fixes,
              enhanced functions, or completely new versions.
            </p>

            <p className="mt-[20px]">
              8. Disclaimers and Limitation of Liability
            </p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - The application is provided on an "as is" and "as available"
              basis without warranties of any kind, either express or implied.
            </p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - We do not warrant that the application will be uninterrupted or
              error-free.
            </p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - In no event will we be liable for any damages arising out of or
              in connection with the use or inability to use the application.
            </p>

            <p className="mt-[20px]">9. Governing Law</p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - These terms and conditions are governed by and construed in
              accordance with the laws of [Your Country/State], and you submit
              to the exclusive jurisdiction of the courts located in [Your
              Country/State] for the resolution of any disputes.
            </p>

            <p className="mt-[20px]">10. Changes to Terms and Conditions</p>
            <p
              style={{
                textIndent: "15px",
              }}
            >
              - We reserve the right to modify these terms and conditions at any
              time. Any changes will be effective immediately upon posting on
              the application. Your continued use of the application following
              the posting of changes constitutes your acceptance of such
              changes.
            </p>
          </div>
          <div
            className="flex gap-3 justify-center  mt-[30px]"
            onClick={() => setAccepted(!accepted)}
          >
            <input type="checkbox" name="terms" id="" checked={accepted} />
            <label htmlFor="terms">
              Accept{" "}
              <span className="text-blue-600 hover:underline">
                <Link to="/terms-conditions">Terms & Conditions</Link>
              </span>
            </label>
          </div>
          <div className="flex flex-col">
            <button
              className={`bg-[#1E1E1E] w-[163px] text-white py-2 rounded-lg mx-auto mt-[30px] ${
                !accepted && "cursor-not-allowed bg-gray-500 text-opacity-50"
              }`}
              onClick={() => {
                if (accepted) navigate("/steps");
              }}
            >
              Continue
            </button>
            <button className="hover:bg-[#1E1E1E] w-[163px] py-2 rounded-lg mx-auto mt-[20px] border-2 border-[#1E1E1E] hover:text-white">
              <Link to="/">Decline</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
