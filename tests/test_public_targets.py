from pathlib import Path
import os
import subprocess
import unittest

class PublicTargetTests(unittest.TestCase):
    def test_target_is_required_before_external_commands(self):
        root=Path(__file__).resolve().parents[1]
        for file,var in [('deploy-k3s.sh','K8S_DIR'),('external-smoke.sh','BASE')]:
            path=root/'scripts'/file
            self.assertTrue('${'+var+':?' in path.read_text(),'missing explicit-target guard')
            env=os.environ.copy(); env.pop(var,None)
            result=subprocess.run(['bash',str(path)],env=env,capture_output=True,timeout=5)
            self.assertNotEqual(result.returncode,0)
            self.assertIn(var.encode(),result.stderr)

if __name__=='__main__': unittest.main()
